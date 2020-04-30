import { LOGOUT, AUTH_REQUEST, AUTH_RECEIVE, AUTH_ERROR } from './actionTypes';
import { loginService } from '../services/loginService';

export function logout() {
    return { type: LOGOUT }
}

export function login(credentials) {
    return dispatch => {
        dispatch(authRequest());
        return loginService.signIn(credentials)
            .then(
                data => {
                    dispatch(authReceive(data.access_token));
                },
                error => {
                    console.debug("Error is coming", error)
                    error.status === 401 && dispatch(authError())
                    return Promise.reject(error);
                }
            );
    }
}

export function authRequest() {
    return { type: AUTH_REQUEST }
}

export function authReceive(token) {
    return { type: AUTH_RECEIVE, payload: token }
}

export function authError() {
    return { type: AUTH_ERROR }
}