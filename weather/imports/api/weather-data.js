import { Mongo } from 'meteor/mongo';

export const WeatherData = new Mongo.Collection('WeatherDatas');

WeatherData.schema = new SimpleSchema({
    name: {
        type: String,
        label: "The name of the GMU Campus"
    },
    lat: {
        type: Number,
        label: "The latitude of the GMU Campus"
    },
    long: {
        type: Number,
        label: "The logiute of the GMU Campus"
    },
    data: {
        type: Object,
        label: "The most current weather entry for this location"
    },
    lastUpdated: {
        type: Date,
        label: "The last time that this campus's current forecast was updated"
    }
})

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
        /**
        WeatherData.insert ({
            name: current.name,
            lat: current.lat,
            long: current.long,
            data: currentData,
            lastUpdated: new Date(),
        });
        */
        let location = {
            name: current.name,
            lat: current.lat,
            long: current.long,
            data: currentData,
            lastUpdated: new Date(),
        }
        WeatherData.schema.validate(location);
        WeatherData.insert(location);
    }
}
