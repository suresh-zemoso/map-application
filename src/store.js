import { createStore, applyMiddleware } from 'redux'
import persistedReducer from './core/reducers/rootReducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
