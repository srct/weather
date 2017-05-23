Template.weather.helpers({
  weatherData: function() {
    weatherDataDependency.depend();
    if(weatherData === undefined) return "...";
    return weatherData;
  },
  //Convert precipitation percentage to words
  precipitationWords: function(rawPrecipProb) {
    weatherDataDependency.depend();
    var precipProb = Math.round(rawPrecipProb * 100);
    if(weatherData === undefined) return "...";
    if(precipProb === 0) return "No Precipitation";
    if(precipProb >= 90) return "Bring an Umbrella ("+precipProb+"% chance)";
    if(precipProb > 100) return "Wat."; //Wait.
    return precipProb+"% Chance of Precipitation"; // Otherwise, return the percentage
  },
  //Convert precipitation percentage to icons
  precipitationIcons: function(rawPrecipProb) {
    weatherDataDependency.depend();
    var precipProb = rawPrecipProb * 100;
    if(weatherData === undefined) return "...";
    if(precipProb === 0) return "cloud";
    if(precipProb > 50 && precipProb < 95) return "showers";
    if(precipProb > 95) return "umbrella";
    if(precipProb > 100) return "alien"; //Wait.
    return precipProb+"% Precipitation"; // Otherwise, return the percentage
  },
  precipitationReadable: function(rawPrecipProb) {
      weatherDataDependency.depend();
      var precipProb = Math.round(rawPrecipProb * 100);
      return precipProb;
  },
  //Converts degrees to words
  windDirection: function() {
    weatherDataDependency.depend();
    if(weatherData === undefined) return "...";
    return degreesToWords(weatherData.data.currently.windBearing);
  },
  //Gets the class name to be used by the wind icon
  windDirectionClass: function() {
    weatherDataDependency.depend();
    if(weatherData === undefined) return "...";
    return degreesToWords(weatherData.data.currently.windBearing).toLowerCase();
  },
  //Rounds a number
  roundNumber: function(number) {
    if(number === undefined) return "...";
    return Math.round(number);
  },
  //Formats a unix timestamp a full human readable time
  formatTimestamp: function(timestamp) {
    if(timestamp === undefined) return "...";
    var d = new Date(timestamp*1000);
    //console.log("GOT: "+timestamp)
    return d.toLocaleString("en-us", { hour: 'numeric', minute: 'numeric', timeZoneName:'short'});
  },
  //Formats unix time to just a 12 hour time
  formatTimestampToHour: function(timestamp) {
    if(timestamp === undefined) return "...";
    var d = new Date(timestamp*1000);
    //console.log("GOT: "+timestamp)
    return d.toLocaleString("en-us", { hour: 'numeric'});
  },
  //Converts icon names from darksky to those that can be used by our css library
  convertIconName: function(apiIcon) {
    var iconMap = {
      "clear-day": "wi-day-sunny",
      "clear-night": "wi-night-clear",
      "rain": "wi-rain",
      "snow": "wi-snow",
      "sleet": "wi-sleet",
      "wind": "wi-strong-wind",
      "fog": "wi-fog",
      "cloudy": "wi-cloudy",
      "partly-cloudy-day": "wi-day-cloudy",
      "partly-cloudy-night": "wi-night-cloudy"
    }
    //It is possible for this to be undefined but it should be ok to show no icon
    var icon = iconMap[apiIcon];
    return icon;
  },
  //Returns current unix time
  currentLinuxTime: function() {
    return (new Date).getTime()/1000;
  },
  //Used to check if a unix timestamp is in the future
  timeAfterNow: function(time) {
    return time>((new Date).getTime()/1000);
  },
  //This is used to trim the hourly data array down to the next 12 hours since it return 2 days worth of data
  getNext12: function(hourDataArray) {
    //I'm sure this can be cleaned but. oh well.
    var startIndex = 0;
    for(var i = 0; i < hourDataArray.length; i++) {
      if(hourDataArray[i].time > ((new Date).getTime()/1000)) {
        startIndex = i;
        break;
      }
    }
    return hourDataArray.slice(startIndex, startIndex+12)
  },
  getDayNameFromTime: function(timestamp) {
      var given = new Date(timestamp * 1000);
      console.log(given);
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      return days[ given.getDay() ];
  },
  getColorStyle: function(temp) {
      if(temp < 10) {
          return "degree0";
      }
      else if(temp >= 10 && temp < 20) {
          return "degree10";
      }
      else if(temp >= 20 && temp < 30) {
          return "degree20";
      }
      else if(temp >= 30 && temp < 40) {
          return "degree30";
      }
      else if(temp >= 40 && temp < 50) {
          return "degree40";
      }
      else if(temp >= 50 && temp < 60) {
          return "degree50";
      }
      else if(temp >= 60 && temp < 70) {
          return "degree60";
      }
      else if(temp >= 70 && temp < 80) {
          return "degree70";
      }
      else if(temp >= 80 && temp < 90) {
          return "degree80";
      }
      else if(temp >= 90 && temp < 100) {
          return "degree90";
      }
      else if(temp >= 100) {
          return "degree100";
      }
      else {
          return temp;
      }
  }
});

var weatherData = {};
var weatherDataDependency = new Tracker.Dependency;
Template.weather.onCreated(function(){
  Session.set("locationName", "FAIRFAX");
  Tracker.autorun(function () {
    var locName = Session.get("locationName");
    var location = LOCATIONS[locName];

    Meteor.call('getWeather', location.lat, location.long, function(error, result) {
      weatherData = result;
      document.title = "SRCT Weather • "+Math.round(result.data.currently.temperature)+"° F"
      weatherDataDependency.changed();
    });
  });
});

//Converts the bearing to a compass direction
function degreesToWords(d) {
  if (typeof d !== 'number' || isNaN(d)) {
    return -1;
  }

  // keep within the range: 0 <= d < 360
  d = d % 360;

  if (11.25 <= d && d < 33.75) {
    return "NNE";
  } else if (33.75 <= d && d < 56.25) {
    return "NE";
  } else if (56.25 <= d && d < 78.75) {
    return "ENE";
  } else if (78.75 <= d && d < 101.25) {
    return "E";
  } else if (101.25 <= d && d < 123.75) {
    return "ESE";
  } else if (123.75 <= d && d < 146.25) {
    return "SE";
  } else if (146.25 <= d && d < 168.75) {
    return "SSE";
  } else if (168.75 <= d && d < 191.25) {
    return "S";
  } else if (191.25 <= d && d < 213.75) {
    return "SSW";
  } else if (213.75 <= d && d < 236.25) {
    return "SW";
  } else if (236.25 <= d && d < 258.75) {
    return "WSW";
  } else if (258.75 <= d && d < 281.25) {
    return "W";
  } else if (281.25 <= d && d < 303.75) {
    return "WNW";
  } else if (303.75 <= d && d < 326.25) {
    return "NW";
  } else if (326.25 <= d && d < 348.75) {
    return "NNW";
  } else {
    return "N";
  }
};
