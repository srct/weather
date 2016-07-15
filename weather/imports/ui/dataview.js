import { Template } from 'meteor/templating';

import { WeatherData } from '../api/data.js';

import '../../client/weather.html';

export default Template.body.helpers({
  current() {
    return WeatherData.find({});
  },
});
