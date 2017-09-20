import { combineReducers } from 'redux'

function authReducer(state, action) {
    console.log(action)
    switch(action.type) {
        case 'GET_USER':
            return Object.assign({}, state, {
                user : {email : action.email, uid: action.uid},
                loggedIn: true,
                screen: 'list'
            })
        case 'GET_USERNAME':
            return Object.assign({}, state, {
                user: {username: action.username}
            })
        case 'GET_TARGETS':
            return Object.assign({}, state, {
                targets: action.targets
            })
        case 'GET_SCORE':
            return Object.assign({}, state, {
                score: action.score
            })
        case 'CHANGE_SCREEN':
            return Object.assign({}, state, {
                screen: action.newScreen
            })
        case 'FOUND_ITEMS':
            console.log(action.found)
            return Object.assign({}, state, {foundItem: action.found})
        case 'RESET_FOUND':
            return Object.assign({}, state, {foundItem: -2})
        case 'SWITCH_LOADING':
            return Object.assign({}, state, {loading: !state.loading})
        default:
            return state
    }
}

const rootReducer = combineReducers({
    authReducer
})

//export default rootReducer
export default authReducer