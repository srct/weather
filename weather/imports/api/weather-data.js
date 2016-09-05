import { Mongo } from 'meteor/mongo';

export const WeatherData = new Mongo.Collection('weather-data');

Meteor.methods({
    'weatherDataForLoc': function (lat, long) {
        // API_KEY is an environmental veriable, you can set it with a JS file in
        // server/lib or in your server control panel.
        var API_KEY = process.env.API_KEY;
        var apiURL = 'https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',' + long;
        var response = HTTP.get(apiURL).data;
        return response;
    }
});


export function refreshData() {
    for(var key in LOCATIONS) {
        const current = LOCATIONS[key];
        var currentData
        Meteor.call('weatherDataForLoc', current.lat, current.long, function(err, res){
            currentData = res
        });
        WeatherData.insert ({
            name: current.name,
            lat: current.lat,
            long: current.long,
            data: currentData,
            lastUpdated: new Date(),
        });
    }
}
