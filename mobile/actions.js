import firebase from './firebase'

export function getUser() {
    console.log('it kinda works')
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(storeUserInfo(user))
            } else {
              // No user is signed in.
            }
        });
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