'use strict';

const conf = require('../config.json');
const db = require('./db');
const imageclassifier = require('./imageclassifier');

let mod = module.exports = {};

mod.runGameSession = (socket) => {
    socket.on('auth', (user) => {
        socket.userId = user.userId;
        db.initUser(user).then(() => {
            foundListener(socket);
        });
    });
    //db.targetFound('RxRS7Ys4EETn2ddsdsdJpIsssqZl7m1', 'chair');
}

function foundListener(socket) {
    socket.on('found', (data) => {
        db.getCurrentTargets().then((tags) => {
            imageclassifier.classifyImage(data.images, tags).then((found) => {
                for (let i = 0; i < found.length; i++) {
                    db.targetFound(socket.userId, found[i]);
                    socket.emit('correct', found[i]);
                }
            });  
        });
    });
}