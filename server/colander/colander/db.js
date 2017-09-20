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

mod.getCurrentTargets = (userId) => {
    let promise = (resolve, reject) => {
        usersRef.child(userId + '/currentTargets').once('value').then((targets) => {
            resolve(targets.val());
        });
    }
    return new Promise(promise);
};

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
                //reject();
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
            let index;
            if (targetsObj && (index = targetsObj.indexOf(replaced)) && index != -1) {
                mod.getNewTarget(userId).then((data) => {
                    targetsObj[index] = data;
                    targetsRef.set(targetsObj);
                    resolve();
                });
            } else {
                //reject();
            }
        });
    };
    return new Promise(promise);
};

mod.targetFound = (userId, targetName, callback) => {
    let targetRef = targetMetaRef.child(targetName);
    let foundRef = usersRef.child(userId + '/found');
    targetRef.once('value').then((target) => {
        let targetObj = target.val();
        if (targetObj && targetObj.foundBy) {
            if (targetObj.foundBy.indexOf(userId) == -1) {
                let prevScore = targetObj.value;
                targetObj.foundBy.push(userId);
                targetObj.value = calculateValue(targetObj.foundBy.length);
                targetRef.set(targetObj).then(() => {
                    updateUserScores(userId, prevScore, targetObj.value, targetName);
                  
                });
            }
          
        } else {
            let value = calculateValue(1);
            targetRef.set({
                foundBy: [userId],
                value: value
            }).then(() => {
                updateUserScores(userId, 0, value, targetName);
            });
        }
    });
    foundRef.once('value').then((found) => {
        let foundObj = found.val();
        if (foundObj) {
            if (foundObj.indexOf(targetName) == -1) {
                foundObj.push(targetName);
                foundRef.set(foundObj);
            }
        } else {
            foundRef.set([targetName]);
        }
    });
    mod.replaceTarget(userId, targetName);
};

mod.initUser = (user) => {
    let promise = (resolve, reject) => {
        let userRef = usersRef.child(user.userId);
        userRef.once('value').then((existing) => {
            if (!existing.val()) {
                targetsRef.once('value').then((targets) => {
                    let initial = targets.val();
                    shuffleArray(initial);
                    let newUser = {
                        username: user.username,
                        email: user.email,
                        score: 0,
                        currentTargets: initial.slice(0, conf.targetListSize)
                    }
                    userRef.set(newUser).then(resolve);
                });
            } else {
                resolve();
            }
        });
    };
    return new Promise(promise);
};

mod.getLeaderboard = () => {
    // DISGUSTING hack fix this soon
    let promise = (resolve, reject) => {
        usersRef.once('value').then((data) => {
            let unranked = data.val();
            let output = [];
            for (let id in unranked) {
                output.push({
                    userId: id,
                    username: unranked[id].username,
                    score: unranked[id].score
                });
            }
            output.sort((a, b) => {
                return b.score - a.score;
            });
            resolve(output);
        });
    };
    return new Promise(promise);
};

function updateUserScores(userId, prevScore, newScore, targetName) {
    let foundByRef = targetMetaRef.child(targetName + '/foundBy');
    foundByRef.once('value').then((data) => {
        let foundByObj = data.val();
        for (let i = 0; i < foundByObj.length; i++) {
            let scoreRef = usersRef.child(foundByObj[i] + '/score');
            scoreRef.once('value').then((score) => {
                if (foundByObj[i] == userId) {
                    scoreRef.set(score.val() + newScore);
                } else {
                    scoreRef.set(score.val() + newScore - prevScore);
                }
            });
        }
    });
};

function getRandomFromSetDifference(a, b) {
    let shuffle = Array.apply(null, {
        length: a.length
    }).map(Number.call, Number);
    shuffleArray(shuffle);
    for (let i = 0; i < a.length; i++) {
        let n = a[shuffle[i]];
        if (!b.has(n)) {
            return n;
        }
    }
    return null;
}

function calculateValue(foundBy) {
    return Math.floor(10000 / (foundBy + 9));
}

function shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}