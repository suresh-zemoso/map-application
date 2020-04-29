import {
    SAVE_ALL,
    LOADING_LOCATIONS,
    FETCH_ERROR,
    SAVE_FAILED,
    SAVE_SUCCESS
} from '../actions/actionTypes'


const initialState = {
    loading: true,
    locations: [],
    fetchError: false,
    errorMessage: "Error in Fetching state",
    saveError: false,
}
export function locationState(state = initialState, action) {
    switch (action.type) {
        case LOADING_LOCATIONS:
            return { ...state, loading: true }
        case SAVE_ALL:
            return { ...state, locations: action.locations, loading: false }
        case FETCH_ERROR:
            return { ...state, fetchError: true, loading: false }
        case SAVE_FAILED:
            return { ...state, saveError: true }
        case SAVE_SUCCESS:
            return { ...state, saveError: false }
        default:
            return state
    }
}