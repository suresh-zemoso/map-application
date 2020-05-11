
import { authentication as reducer } from '../../reducers/loginReducer';
import * as actionTypes from '../../actions/actionTypes';

describe('login reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            accessToken: '',
            isLogin: false,
            isFetching: false,
            error: false,
            errorMessage: ''
        }
        expect(reducer(undefined, initialState)).toEqual(initialState);
    });

    it('should handle AUTH_REQUEST', () => {
        const startAction = {
            type: actionTypes.AUTH_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({ isFetching: true });
    });

    it('should handle AUTH_RECEIVE', () => {
        const successAction = {
            type: actionTypes.AUTH_RECEIVE,
            payload: "access_token",
        };
        const stateAfterSuccess = {
            isLogin: true,
            error: false,
            isFetching: false,
            accessToken: "access_token",
        }
        expect(reducer({}, successAction)).toEqual(stateAfterSuccess);
    });

    it('should handle AUTH_ERROR', () => {
        const errorAction = {
            type: actionTypes.AUTH_ERROR,
        };
        const stateAfterFailure = {
            error: true,
            isFetching: false,
            errorMessage: 'Incorrect login or password!'
        }
        expect(reducer({}, errorAction)).toEqual(stateAfterFailure);
    });

    it('should handle LOGOUT', () => {
        const logoutAction = {
            type: actionTypes.LOGOUT,
        };
        const stateAfterLogout = {
            isLogin: false, accessToken: ''
        }
        expect(reducer({}, logoutAction)).toEqual(stateAfterLogout);
    });
});