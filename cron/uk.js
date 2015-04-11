var _ = require('lodash');

var ids = {
  'B00Q6A57J2': false,
  'B00O9QCJFK': false,
  'B00SSU692M': false,
  'B00O9QC5N6': false,
  'B00N8PBOFO': false,
  'B00N8PBS0A': false,
  'B00Q6A571A': false,
  'B00QGBNLUI': false,
  'B00N8PBZSA': false,
  'B00N8PBQDE': false,
  'B00O9QC5R2': false,
  'B00Q6A578I': false,
  'B00SSU6936': false,
  'B00O9QC5Y0': false,
  'B00N8PBGV6': false,
  'B00N8PC142': false,
  'B00QGBNLU8': false,
  'B00QGBNMW0': false,
  'B00SSU6940': false,
  'B00SSU69DG': false,
  'B00N8PBJQ8': false,
  'B00N8PBYK4': false,
  'B00O9QCHDO': false,
  'B00SSU693Q': false,
  'B00Q6A56C0': false,
  'B00N8PBTVS': false,
  'B00Q6A56DY': false,
  'B00QGBNLUS': false,
  'B00QGBNLTO': false,
  'B00Q6A57C4': false,
  'B00N8PBXFK': false,
  'B00SSU65QC': false,
  'B00N8PBVHU': false,
  'B00N8PBMK6': false,
  'B00O9QC5PY': false
}

var credentials = {
  awsId: process.env.AWSIDUK,
  awsSecret: process.env.AWSSECRETUK,
  awsTag: 'kings0b-21'
};

var domain = 'webservices.amazon.co.uk'

module.exports = {
  ids: _.chunk(Object.keys(ids), 10),
  domain: domain,
  credentials: credentials
}