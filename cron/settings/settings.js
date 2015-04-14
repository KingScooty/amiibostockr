'use strict';

// Locale files to be imported
var locales = [
  'UK',
  'US'
];

var settings = {};

locales.forEach(function callback(locale) {
  settings[locale] = require('./locales/' + locale);
});

module.exports = settings;
