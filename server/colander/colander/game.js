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
				console.log(socket.userId);
    });
    //db.targetFound('RxRS7Ys4EETn2ddsdsdJpIsssqZl7m1', 'chair');
}

function foundListener(socket) {
    socket.on('found', (data) => {
        console.log(data);
        db.getCurrentTargets(socket.userId).then((tags) => {
            imageclassifier.classifyImage(data.images, tags).then((found) => {
								console.log(found);
                for (let i = 0; i < found.length; i++) {
                    db.targetFound(socket.userId, found[i]);
                    socket.emit('correct', found[i]);
                }
								if (found.length == 0) {
									socket.emit('correct', -1);
								}
            });
        });
    });
    socket.on('replace', (data) => {
        db.replaceItem(socket.userId, data)
    });
}
