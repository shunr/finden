'use strict';

const request = require('request');
const conf = require('../config.json');

let mod = module.exports = {};

firebase.initializeApp(conf.firebase);
