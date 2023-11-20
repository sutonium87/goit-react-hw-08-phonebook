// Import necessary functions and components from redux toolkit and redux-persist
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Import reducers from slices
import { contactReducer } from './contacts/contactsSlice';
import { filterReducer } from './filter/filterSlice';
import { authReducer } from './auth/authSlice';

// Configuration for persisting the 'auth' slice of the store
const authPersistConfig = {
  key: 'auth', // Unique key for persisting 'auth' slice
  storage, // Storage engine, in this case, redux-persist storage
  whitelist: ['token'], // Array of state slices to be persisted
};

// Create the Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // Wrap 'auth' reducer with persistReducer
    contacts: contactReducer, // 'contacts' reducer
    filter: filterReducer, // 'filter' reducer
  },
  // Middleware configuration, including serializable check to ignore specific actions
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Actions to be ignored during serialization
      },
    }),
});

// Create the Redux persistor for persisting state
export const persistor = persistStore(store);
