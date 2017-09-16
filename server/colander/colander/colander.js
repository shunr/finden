'use strict';

const request = require('request');
const io = require('socket.io')();
const imageclassifier = require('./imageclassifier');

let mod = module.exports = {};

mod.init = (app) => {
    app.io = io;
    let ioGame = io.of('/game');
    ioGame.on('connection', (socket) => {
        socket.on('auth', (data) => {
            socket.userId = data.userId;
            socket.emit();
        });
        console.log(socket);
        console.log("A user connected");
    });
};

function onAuth(data) { 

}