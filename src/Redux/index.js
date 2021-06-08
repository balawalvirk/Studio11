
import { createStore } from 'redux';
import Reducers from './Reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(persistedReducer);
// let persistor = persistStore(store);
export {
    store,
    // persistor,
};