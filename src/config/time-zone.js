const moment = require('moment')

var jun = moment("2014-06-01T12:00:00Z");
var dec = moment("2014-12-01T12:00:00Z");

jun.tz('America/Santiago').format('ha z');  // 5am PDT
dec.tz('America/Santiago').format('ha z');