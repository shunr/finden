import firebase from './firebase'
import socket from './socket'

const RNFS = require('react-native-fs');

export function getUser(username) {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch({
                    type: 'GET_USER',
                    email: user.email,
                    uid: user.uid,
                })
                if (username) {
                    sendUserInfo(user.uid, user.email, username)
                } else {
                    sendUserInfo(user.uid, user.email, null) 
                }
                dispatch(getUsername(user.uid))
                dispatch(getCurrentTargets(user.uid))
                dispatch(getScore(user.uid))
            } else {
                // No user is signed in.
            }
        });
    }
}

export function getUsername(uid) {
    return dispatch => {
        firebase.database().ref('/users/' + uid + '/username').once('value').then(snapshot => {
            dispatch({
                type: "GET_USERNAME",
                username: snapshot.val()
            })
        })
    }
}

export function getCurrentTargets() {
    console.log()
    return dispatch => {
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + uid + '/currentTargets').on('value', snapshot => {
            console.log(snapshot.val())
            dispatch({
                type: "GET_TARGETS",
                targets: snapshot.val()
            })
        })
    }
}

export function getScore() {
    return dispatch => {
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + uid + '/score').on('value', snapshot => {
            dispatch({
                type: "GET_SCORE",
                score: snapshot.val()
            })
        })
    }
}

export function getLeaderboard() {
    return dispatch => {
        fetch('http://findengame.com/leaderJson').then(data => console.log(data))
    }
}

export function storeUserInfo(user) {
    return {
        type: 'GET_USER',
        email: user.email,
        uid: user.uid
    }
}

export function changeScreen(newScreen) {
    return {
        type: 'CHANGE_SCREEN',
        newScreen: newScreen
    }
}

export function sendImageBase64(data) {
    console.log(data)
    return dispatch => {
        RNFS.readFile(data.path, 'base64').then(data => {
            socket.emit('found', {images: [data]});
            socket.on('correct', found => {
                dispatch(switchLoading())
                console.log(found)
                dispatch({
                    type: 'FOUND_ITEMS',
                    found: found
                })
            });
        });
    }
}

export function switchLoading() {
    return ({
        type: 'SWITCH_LOADING'
    })
}

export function resetFound() {
    return {
        type: 'RESET_FOUND'
    }
}

export function sendUserInfo(userid, email, username) {
    //Sends the new account's username and email to the server
    socket.emit('auth', { userId: userid, email: email, username: username })
}

export function sendPhoto() {
    return dispatch => {
        socket.emit('succ', { hello: 'world' })
    }
}
