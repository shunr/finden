import firebase from './firebase'
import socket from './socket'
import request from 'request'

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
                }
                dispatch(getUsername(user.uid))
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

export function getLeaderboard() {
    return dispatch => {
        request('http://10.21.225.54/leaderJson').then(data => console.log(data))
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

export function sendUserInfo(userid, email, username) {
    //Sends the new account's username and email to the server
    socket.emit('auth', {userId: userid, email: email, username: username})
}

export function sendPhoto() {
    return dispatch => {
        socket.emit('succ', {hello: 'world'})
    }
}
