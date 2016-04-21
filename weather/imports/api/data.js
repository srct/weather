"use strict";
import { Mongo } from 'meteor/mongo';

export const WeatherData = new Mongo.Collection('weather-data');
