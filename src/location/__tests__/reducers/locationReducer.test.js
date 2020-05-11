
import { locationState as reducer } from '../../reducers/locationReducer';
import * as actionTypes from '../../actions/actionTypes';

describe('location reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            loading: true,
            locations: [],
            fetchError: false,
            errorMessage: "Error in Fetching state",
            saveError: false,
        }
        expect(reducer(undefined, initialState)).toEqual(initialState);
    });

    it('should handle LOADING_LOCATIONS', () => {
        const startAction = {
            type: actionTypes.LOADING_LOCATIONS
        };
        expect(reducer({}, startAction)).toEqual({ loading: true });
    });

    it('should handle SAVE_ALL', () => {
        const successAction = {
            type: actionTypes.SAVE_ALL,
            payload: [{ lng: 32, lat: 56 }],
        };
        const stateAfterSuccess = {
            locations: [{ lng: 32, lat: 56 }], loading: false
        }
        expect(reducer({}, successAction)).toEqual(stateAfterSuccess);
    });

    it('should handle FETCH_ERROR', () => {
        const errorAction = {
            type: actionTypes.FETCH_ERROR,
        };
        const stateAfterFailure = {
            fetchError: true, loading: false
        }
        expect(reducer({}, errorAction)).toEqual(stateAfterFailure);
    });

    it('should handle SAVE_SUCCESS', () => {
        const saveAction = {
            type: actionTypes.SAVE_SUCCESS,
        };
        const stateAfterSuccess = {
            saveError: false
        }
        expect(reducer({}, saveAction)).toEqual(stateAfterSuccess);
    });


    it('should handle SAVE_FAILED', () => {
        const saveFailedAction = {
            type: actionTypes.SAVE_FAILED,
        };
        const stateAfterFailure = {
            saveError: true
        }
        expect(reducer({}, saveFailedAction)).toEqual(stateAfterFailure);
    });
});