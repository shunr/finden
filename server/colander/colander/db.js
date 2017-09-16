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
let targetMetaRef = rootRef.child("targetMeta");

mod.getNewTarget = (userId) => {
    let promise = (resolve, reject) => {
        usersRef.child(userId).once('value').then((user) => {
            let userObj = user.val();
            if (userObj) {
                targetsRef.once('value').then((data) => {
                    let targets = data.val();
                    let found = [];
                    if (userObj.found && userObj.currentTargets) {
                        found = new Set([...userObj.found, ...userObj.currentTargets]);
                    }
                    resolve(getRandomFromSetDifference(targets, found));
                });
            } else {
                reject();
            }
        });
    }
    return new Promise(promise);
};

mod.replaceTarget = (userId, replaced) => {
    let promise = (resolve, reject) => {
        let targetsRef = usersRef.child(userId + '/currentTargets');
        targetsRef.once('value').then((targets) => {
            let targetsObj = targets.val();
            let index = targetsObj.indexOf(replaced);
            if (targetsObj && index != -1) {
                mod.getNewTarget(userId).then((data) => {
                    targetsObj[index] = data;
                    targetsRef.set(targetsObj);
                    resolve();
                });
            } else {
                reject();
            }
        });
    };
    return new Promise(promise);
};

mod.targetFound = (userId, targetName) => {
    let targetRef = targetMetaRef.child(targetName);
    let foundRef = usersRef.child(userId + '/found');
    targetRef.once('value').then((target) => {
        let targetObj = targets.val();
        if (targetObj && targetObj.foundBy) {
            targetObj.foundBy.push(userId);
            targetObj.value = calculateValue(targetObj.foundBy.length);
            targetRef.set();
        }
    });
    foundRef.child(userId).once('value')
    mod.replaceTarget(userId, target);
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

function calculateValue (foundBy) {
    return Math.floor(10000 / foundBy + 10);
}