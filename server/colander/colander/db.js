'use strict';

const request = require('request');
const firebase = require('firebase-admin');

const conf = require('../config.json');
const serviceAccount = require("../secret/service_account_key.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://colander-htn.firebaseio.com"
});

let mod = module.exports = {};


let db = firebase.database();
let rootRef = firebase.database().ref();
let usersRef = rootRef.child("users");
let targetsRef = rootRef.child("targets");

mod.getTargetList = (userId) => {
    return new Promise((resolve) => {
        usersRef.child(userId).once('value').then((user) => {
            if (user) {
                targetsRef.once('value').then((data) => {
                    let targets = data.val();
                    let found = new Set(user.found);
                    resolve(getRandomFromSetDifference(targets, found));
                });
            }
        });
    });
};

function getRandomFromSetDifference(a, b) {
    let shuffle = Array.apply(null, {
        length: a.length
    }).map(Number.call, Number);
    for (let i = shuffle.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [shuffle[i - 1], shuffle[j]] = [shuffle[j], shuffle[i - 1]];
    }
    for (let i = 0; i < a.length; i++) {
        let n = a[shuffle[i]];
        if (!b.has(n)) {
            return n;
        }
    }
}