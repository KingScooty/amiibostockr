var _ = require('lodash');

var ASIN = {
  'B00PG6Z65M': false,
  'B00O97ZVJ0': false,
  'B00V86BJX2': false,
  'B00O982JSU': false,
  'B00N4ABP7A': false,
  'B00N4ABODK': false,
  'B00PG7M95G': false,
  'B00PG6ZDPK': false,
  'B00N4ABV10': false,
  'B00N4ABVOM': false,
  'B00O97ZVJA': false,
  'B00V86BJV4': false,
  'B00O97ZWVC': false,
  'B00N4ABMG4': false,
  'B00N4ABOXU': false,
  'B00PG6ZCT2': false,
  'B00V86BRK2': false,
  'B00N4ABT1W': false,
  'B00N4ABSLS': false,
  'B00O97ZYP6': false,
  'B00V86BRHU': false,
  'B00N49EEO2': false,
  'B00PG6ZAZ8': false,
  'B00PG6ZBTS': false,
  'B00PG6Z9VI': false,
  'B00N4ABMUA': false,
  'B00V86C4LS': false,
  'B00N49EERY': false,
  'B00N4ABT1C': false,
  'B00O92ONBM': false
};

var credentials = {
  awsId: process.env.AWSIDUS,
  awsSecret: process.env.AWSSECRETUS,
  awsTag: 'kings0b-21'
};

var domain = 'webservices.amazon.com';

module.exports = {
  ASIN: ASIN,
  ASINchunked: _.chunk(Object.keys(ASIN), 10),
  domain: domain,
  credentials: credentials
}