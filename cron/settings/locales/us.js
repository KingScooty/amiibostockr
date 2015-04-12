var _ = require('lodash');

var ASIN = [
  'B00PG6Z65M',
  'B00O97ZVJ0',
  'B00V86BJX2',
  'B00O982JSU',
  'B00N4ABP7A',
  'B00N4ABODK',
  'B00PG7M95G',
  'B00PG6ZDPK',
  'B00N4ABV10',
  'B00N4ABVOM',
  'B00O97ZVJA',
  'B00V86BJV4',
  'B00O97ZWVC',
  'B00N4ABMG4',
  'B00N4ABOXU',
  'B00PG6ZCT2',
  'B00V86BRK2',
  'B00N4ABT1W',
  'B00N4ABSLS',
  'B00O97ZYP6',
  'B00V86BRHU',
  'B00N49EEO2',
  'B00PG6ZAZ8',
  'B00PG6ZBTS',
  'B00PG6Z9VI',
  'B00N4ABMUA',
  'B00V86C4LS',
  'B00N49EERY',
  'B00N4ABT1C',
  'B00O92ONBM'
];

var credentials = {
  awsId: process.env.AWSIDUS,
  awsSecret: process.env.AWSSECRETUS,
  awsTag: 'kings0b-21'
};

var domain = 'webservices.amazon.com';

module.exports = {
  ASIN: ASIN,
  // ASINchunked: _.chunk(Object.keys(ASIN), 10),
  ASINchunked: _.chunk(ASIN, 10),
  domain: domain,
  credentials: credentials
}