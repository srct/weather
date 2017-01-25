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
        label: "The longiute of the GMU Campus"
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
