import { combineReducers } from 'redux'
import { authentication } from './loginReducer';
import { locations } from './locationReducer';

const rootReducer = combineReducers({
    authentication,
    locations
})
export default rootReducer;