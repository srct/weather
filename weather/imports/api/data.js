"use strict";
import { Mongo } from 'meteor/mongo';

export const WeatherData = new Mongo.Collection('weather-data');

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
