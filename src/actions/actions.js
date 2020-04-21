/*
 * action types
 */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SAVE_ALL = 'SAVE_ALL';


export function logout() {
    return { type: LOGOUT }
}
export function login(token) {
    return { type: LOGIN, token }
}
export function saveAll(locations) {
    return { type: SAVE_ALL, locations }
}