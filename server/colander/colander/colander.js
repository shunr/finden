'use strict';

const request = require('request');
const io = require('socket.io')();

let mod = module.exports = {};

mod.init = (app) => {
    app.io = io;
    let ioGame = io.of('/game');
    ioGame.on('connection', (socket) => {
        socket.on('auth', );
        console.log("A user connected");
    });
};