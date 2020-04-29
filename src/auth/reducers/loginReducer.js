import {
    LOGOUT, AUTH_REQUEST, AUTH_RECEIVE, AUTH_ERROR
} from '../actions/actionTypes'


const initialState = {
    accessToken: '',
    isLogin: false,
    isFetching: false,
    error: false,
    errorMessage: ''
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case AUTH_RECEIVE:
            return {
                ...state,
                isLogin: true,
                isFetching: false,
                accessToken: action.token,
            }
        case AUTH_ERROR:
            return {
                ...state,
                error: true,
                isFetching: false,
                errorMessage: 'Incorrect login or password!'
            }
        case LOGOUT:
            return { ...state, isLogin: false, accessToken: '' }

        default:
            return state
    }
}