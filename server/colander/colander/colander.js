'use strict';

const request = require('request');
const io = require('socket.io')();
const imageclassifier = require('./imageclassifier');
const db = require('./db');

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
    db.getTargetList('test').then((target) => {
        console.log(target);
    });
};

function onAuth(data) { 

}