import { Template } from 'meteor/templating';

import { WeatherData } from '../api/data.js';

import '../../client/weather.html';

Template.body.helpers({
  export function current() {
    return WeatherData.find({});
  },
});
