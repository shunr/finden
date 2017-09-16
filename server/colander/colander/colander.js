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
        });
        socket.on('get');
    });
    db.replaceTarget('testid', 'memes').then((target) => {
        console.log(target);
    });
};

function onAuth(data) { 

}