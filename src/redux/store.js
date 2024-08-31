/**
 * redux store
 */
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {appearanceReducer, userReducer} from './reducers';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appearencePresistConfig = {
  key: 'appearance',
  storage: AsyncStorage,

};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

/**
 * combine all reducers
 */
const rootReducer = combineReducers({
  appearance: persistReducer(appearencePresistConfig, appearanceReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

/**
 * configure and create store
 * @returns store configurations
 */
const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

const store = configureStore();

export const persistor = persistStore(store);

export default store;
