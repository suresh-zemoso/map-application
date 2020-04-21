import {
    LOGIN, LOGOUT
} from '../actions/actions'



export function authentication(state = {}, action) {
    switch (action.type) {
        case LOGOUT:
            return Object.assign({}, state, {
                isLogin: false,
                accessToken: ""
            })
        case LOGIN:
            return Object.assign({}, state, {
                isLogin: true,
                accessToken: action.token,
            })

        default:
            return state
    }
}