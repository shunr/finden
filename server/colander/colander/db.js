'use strict';

const request = require('request');
const firebase = require('firebase');

const conf = require('../config.json');

let mod = module.exports = {};

firebase.initializeApp(conf.firebase);

mod.getList = (userId) => {

};