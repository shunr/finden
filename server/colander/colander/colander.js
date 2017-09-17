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
            console.log(data);
        });
        console.log("succ");
    });
    /*db.replaceTarget('testid', 'leek').then((target) => {
        console.log(target);
    });*/
    db.targetFound('testid', 'bottle');
};

function onAuth(data) { 

}