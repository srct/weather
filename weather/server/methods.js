/**
 * At its core, a Method is an API endpoint for your server; you can define a
 * Method on the server and its counterpart on the client, then call it with
 * some data, write to the database, and get the return value in a callback.
 *
 * https://guide.meteor.com/methods.html
 */
Meteor.methods({
  getWeather: function(latitude, longitude) {
    return getWeather(latitude, longitude);
  }
});

/**
 * Gets the most recent wether data based on the given Lat. and Long. and then
 * returns it. Only gets new data if we have left the acceptable cache time.
 *
 * @param latitude - A long that represents the Lat. of the weather data we
 *                   want.
 * @param longitude - A long that represents the Long. of the weather data we
 *                    want.
 * @return weatherData - An object holding the API call data and retrieval time.
 */
function getWeather(latitude, longitude) {
  var curWeatherData = WeatherData.find({}, {sort: {retrievalTime: -1, limit: 1}}).fetch()[0];

  // Check if there is data at all
  if(curWeatherData === undefined) {
    console.log("Getting first time data.")
    var weatherData = getWeatherFromAPI(latitude, longitude);
    WeatherData.insert(weatherData);
    return curWeatherData;
  }

  // Get current time
  var date = new Date();

  // Subtract the data timestamp form cur time to get age
  var timeDiff = (date.getTime()) - curWeatherData.retrievalTime;

  // The max time that we allow before refreshing the weather data
  var weatherCacheExpireTime = 1800000;

  // If the difference in time since the weather data was collected is greater
  // than our allowed maximum time
  if(timeDiff > weatherCacheExpireTime) {
    // Data is expired, retrieve again.
    console.log("Data Age: " + timeDiff)
    console.log("Cache expired. Retrieving...")
    var weatherData = getWeatherFromAPI(latitude, longitude);

    // Check if there was an error in the API call.
    if(weatherData === undefined) {
      // Mark the latest record as error state.
      curWeatherData.error = true;
      // Return it
      return curWeatherData;
    }
    // Technically the else isn't needed but it looks nice.
    else {
      // Save this new data.
      WeatherData.insert(weatherData);
      return curWeatherData;
    }
  // The data is still valid, return it
  } else {
    console.log("Returning cached data...")
    return curWeatherData;
  }
}

/**
 * Helper function to call the Dark Sky API for the latest data and return an
 * object holding that data.
 * @param latitude - A long that represents the Lat. of the weather data we
 *                   want.
 * @param longitude - A long that represents the Long. of the weather data we
 *                    want.
 * @return weatherData - An object holding the API call data and retrieval time.
 */
function getWeatherFromAPI(latitude, longitude) {
  // Keep the key out of the keybase
  var darkskyAPIKey = process.env.DARKSKY_API_KEY;
  // API URL Call
  var urlBase = "https://api.darksky.net/forecast/"+darkskyAPIKey+"/"+latitude+","+longitude

  try {
    // Make a blocking call
    // I don't think we should add this.unblock() in case that comes up.
    var result = HTTP.call("GET", urlBase);

    // Get current time
    var date = new Date();
    var linuxTime = date.getTime(); // convert millis to seconds

    // Store the retrieval time with the data. We shouldn't get the same data
    // every time someone goes to the page.
    var weatherData = {
      retrievalTime: linuxTime,
      data: result.data,
      error: false
    };

    // Return it
    return weatherData;
  }
  // Got a network error, time-out or HTTP error in the 400 or 500 range.
  catch (e) {
    console.log(e);
    return undefined;
  }
}
