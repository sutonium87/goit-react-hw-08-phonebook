// Async operations for managing contacts using createAsyncThunk from @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Async operation to fetch all contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Async operation to add a new contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Async operation to delete a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Async operation to update a contact
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, {
        name,
        number,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
