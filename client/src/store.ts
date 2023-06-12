import { configureStore } from '@reduxjs/toolkit';
import logginSlice, { loginType } from './slices/logginSlice';
import hangmanGameWordSlice, { wordType } from './slices/wordSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  login: logginSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: { persistedReducer, hangmanGameWord: hangmanGameWordSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StateType = ReturnType<typeof store.getState>;
