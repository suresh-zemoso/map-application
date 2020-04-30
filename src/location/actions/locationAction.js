import { SAVE_ALL, LOADING_LOCATIONS, FETCH_ERROR, SAVE_FAILED, SAVE_SUCCESS } from './actionTypes';
import { locationService } from '../services/locationService';


export function saveAll(locations) {
    return { type: SAVE_ALL, payload: locations }
}
export function loadingLocations() {
    return { type: LOADING_LOCATIONS }
}
export function fetchError() {
    return { type: FETCH_ERROR }
}
export function saveFailed() {
    return { type: SAVE_FAILED }
}
export function saveSuccess() {
    return { type: SAVE_SUCCESS }
}

export function fetchLocations(token) {

    return dispatch => {
        dispatch(loadingLocations());
        return locationService.getLocations(token)
            .then(
                data => {
                    dispatch(saveAll(data))
                },
                error => {
                    dispatch(fetchError())
                }
            );
    }
}

export function addLocation(location, accessToken) {
    return dispatch => {
        return locationService.addLocation(location, accessToken)
            .then(
                data => {
                    dispatch(saveSuccess())
                    return data
                },
                error => {
                    dispatch(saveFailed())
                    return Promise.reject(error);
                    // console.log(error);
                }
            );
    }
}