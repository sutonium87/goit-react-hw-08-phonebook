// Slice for managing contacts state with extra reducers for async operations
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './operations';

// Handler for rejected async operations
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// Contacts slice definition
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      // Fetch contacts operation
      .addCase(fetchContacts.pending, state => {
        state.isLoading = 'fetch';
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      // Add contact operation
      .addCase(addContact.pending, state => {
        state.isLoading = 'add';
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, handleRejected)

      // Delete contact operation
      .addCase(deleteContact.pending, (a, b) => {
        a.isLoading = b.meta.arg;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)

      // Update contact operation
      .addCase(updateContact.pending, state => {
        state.isLoading = 'update';
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1, payload);
      })
      .addCase(updateContact.rejected, handleRejected);
  },
});

// Export the contactReducer from the contacts slice
export const contactReducer = contactsSlice.reducer;
