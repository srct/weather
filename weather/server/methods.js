Meteor.methods({
  getWeather: function(latitude, longitude) {
    return getWeather(latitude, longitude);
  }
});

function getWeather(latitude, longitude) {
  var curWeatherData = WeatherData.find({}, {sort: {retrievalTime: -1, limit: 1}}).fetch()[0];

  //Check if there is data at all
  if(curWeatherData === undefined) {
    console.log("Getting first time data.")
    var weatherData = getWeatherFromAPI(latitude, longitude);
    WeatherData.insert(weatherData);
    return curWeatherData;
  }

  var date = new Date();
  var timeDiff = (date.getTime()) - curWeatherData.retrievalTime; //Subtract the data timestamp form cur time to get age
  if(timeDiff > (Meteor.settings.weatherCacheExpireTime*10)) {
    //Data is expired, retrieve again.
    console.log("Data Age: "+timeDiff)
    console.log("Cache expired. Retrieving...")
    var weatherData = getWeatherFromAPI(latitude, longitude);
    if(weatherData === undefined) {
      //There was an error. Mark the latest record as error state.
      curWeatherData.error = true;
      //Return it
      return curWeatherData;
    } else {
      //Technically the else isn't needed but it looks nice.

      //Save this data.
      WeatherData.insert(weatherData);
      return curWeatherData;
    }
  } else {
    console.log("Returning cached data.")
    //The data is still valid, return it
    return curWeatherData;
  }
}

function getWeatherFromAPI(latitude, longitude) {
  //Keep the key out of the keybase
  var darkskyAPIKey = process.env.DARKSKY_API_KEY;
  var urlBase = "https://api.darksky.net/forecast/"+darkskyAPIKey+"/"+latitude+","+longitude
  console.log(urlBase);

  try {
    //Make a blocking call
    //I don't think we should add this.unblock() in case that comes up.
    var result = HTTP.call("GET", urlBase);

    //Get current time
    var date = new Date();
    var linuxTime = date.getTime(); //convert millis to seconds

    //Store the retrieval time with the data. We shouldn't get the same data every time someone goes to the page.
    var weatherData = {
      retrievalTime: linuxTime,
      data: result.data,
      error: false
    };
    //Return it
    return weatherData;
  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log(e);
    return undefined;
  }
}
