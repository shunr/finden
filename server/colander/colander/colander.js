'use strict';

const request = require('request');
const io = require('socket.io')();

const game = require('./game');

let mod = module.exports = {};

mod.init = (app) => {
    app.io = io;
    let ioGame = io.of('/game');
    ioGame.on('connection', (socket) => {
        game.runGameSession(socket);
        console.log("User connected");
    });
};