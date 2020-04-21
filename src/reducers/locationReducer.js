import {
    SAVE_ALL
} from '../actions/actions'



export function locations(state = [], action) {
    switch (action.type) {
        case SAVE_ALL:
            return action.locations

        default:
            return state
    }
}