import { combineReducers } from 'redux'
import { authentication } from '../../auth/reducers/loginReducer';
import { locationState } from '../../location/reducers/locationReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['authentication', 'locationState']
}
const authPersistConfig = {
    key: 'authentication',
    storage,
    blacklist: ['error']
}
const locationPersistConfig = {
    key: 'locationState',
    storage,
    blacklist: ['fetchError', 'loading']
}

const rootReducer = combineReducers({
    authentication: persistReducer(authPersistConfig, authentication),
    locationState: persistReducer(locationPersistConfig, locationState)
})

export default persistReducer(persistConfig, rootReducer)
