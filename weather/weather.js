if (Meteor.isClient) {
    for(var key in LOCATIONS) {
        var current = LOCATIONS[key];
        console.log(current.name);
        Meteor.call('weatherDataForLoc', current.lat, current.long, function(err, res){
            console.log(res);
            //Sends the result of the API call to the browser console, will change
        });
    }

  Template.weather.helpers({
      updateData: function() {

      }
  });

  Template.weather.events({

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

Meteor.methods({
    'weatherDataForLoc': function (lat, long) {
        //API_KEY is an environmental veriable, you can set it with a JS file in
        // server/lib or in your server control panel.
        var API_KEY = process.env.API_KEY;
        var apiURL = 'https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',' + long;
        var response = HTTP.get(apiURL).data;
        return response;
    }
});
}
