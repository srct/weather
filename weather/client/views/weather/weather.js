Template.weather.helpers({
  weatherData: function() {
    weatherDataDependency.depend();
    return weatherData;
  },
  precipitationWords: function() {
    weatherDataDependency.depend();
    var precipProb = weatherData.data.currently.precipProbability;
    if(precipProb === 0) return "No Rain Expected";
    if(precipProb > 95) return "Bring an Umbrella";
    if(precipProb > 100) return "Wat."; //Wait.
    return precipProb+"%"; // Otherwise, return the percentage
  },
  windDirection: function() {
    weatherDataDependency.depend();
    return degreesToWords(weatherData.data.currently.windBearing);
  },
  windDirectionClass: function() {
    weatherDataDependency.depend();
    return degreesToWords(weatherData.data.currently.windBearing).toLowerCase();
  },
  roundNumber: function(number) {
    return Math.round(number);
  },
  formatTimestamp(timestamp) {
    var d = new Date();
    return d.toLocaleString("en-us", { hour: 'numeric', minute: 'numeric', timeZoneName:'short'});
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
