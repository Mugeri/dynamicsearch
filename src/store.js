import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import search from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, search);

export default function configureStore() {
  let store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk, logger)),
  );
  let persistor = persistStore(store);
  return { store, persistor};
}
