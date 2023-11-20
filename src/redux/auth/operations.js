// Import createAsyncThunk from '@reduxjs/toolkit' for handling asynchronous actions
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import axios for making HTTP requests
import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Function to set the Authorization header in axios
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Function to clear the Authorization header in axios
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Define an asynchronous action creator for user registration
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      // Make a POST request to register a user
      const response = await axios.post('/users/signup', credentials);
      // Set the Authorization header with the obtained token
      setAuthHeader(response.data.token);
      // Return the response data
      return response.data;
    } catch (e) {
      // Handle errors and reject with a specific error message
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Define an asynchronous action creator for user login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Make a POST request to log in a user
      const response = await axios.post('/users/login', credentials);
      // Set the Authorization header with the obtained token
      setAuthHeader(response.data.token);
      // Return the response data
      return response.data;
    } catch (e) {
      // Handle errors and reject with a specific error message
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Define an asynchronous action creator for user logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Make a POST request to log out a user
    await axios.post('/users/logout');
    // Clear the Authorization header
    clearAuthHeader();
  } catch (e) {
    // Handle errors and reject with a specific error message
    return thunkAPI.rejectWithValue(e.message);
  }
});

// Define an asynchronous action creator for refreshing the user token
export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  // Get the persisted token from the state
  const persistedToken = thunkAPI.getState().auth.token;

  // Check if there is a token
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('There is no token to fetch user');
  }

  try {
    // Set the Authorization header with the persisted token
    setAuthHeader(persistedToken);
    // Make a GET request to fetch the current user
    const response = await axios.get('/users/current');
    // Return the response data
    return response.data;
  } catch (e) {
    // Handle errors and reject with a specific error message
    return thunkAPI.rejectWithValue(e.message);
  }
});
