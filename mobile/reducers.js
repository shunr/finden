import { combineReducers } from 'redux'

function authReducer(state, action) {
    console.log(action)
    switch(action.type) {
        case 'GET_USER':
            return Object.assign({}, state, {
                user : {email : action.email, uid: action.uid},
                loggedIn: true,
                screen: 'game'
            })
        case 'GET_USERNAME':
            return Object.assign({}, state, {
                user: {username: action.username}
            })
        case 'CHANGE_SCREEN':
            return Object.assign({}, {
                screen: action.newScreen
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    authReducer
})

//export default rootReducer
export default authReducer