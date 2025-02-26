import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from "../features/authSlice";

const persistConfig = {
  key: 'root', // key is the name of the key in the storage
  storage, // storage method to use
};

const persistedReducer = persistReducer(persistConfig, authReducer); // Create a persisted reducer

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Important for persist to work
});

export const persistor = persistStore(store); // Create a persistor object
