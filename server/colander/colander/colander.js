'use strict';

const request = require('request');
const socket_io = require('socket.io');
const io = socket_io();

let mod = module.exports = {};


mod.init = (app) => {
    app.io = io;
    io.on('connection', function(socket) {
        console.log( "A user connected" );
    });
};