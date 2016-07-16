import { Template } from 'meteor/templating';

import { WeatherData } from '../api/data.js';

import '../../client/weather.html';

Template.body.helpers({
  current() {
    return WeatherData.find({});
  },
});
