import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { persistReducer, persistStore } from 'redux-persist';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
