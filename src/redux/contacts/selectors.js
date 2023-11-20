// Selectors for managing contacts using createSelector from @reduxjs/toolkit
import { createSelector } from '@reduxjs/toolkit';

// Select the contacts items from the state
export const selectContacts = state => state.contacts.items;

// Select the filter value from the state
export const selectFilter = state => state.filter.filter;

// Select the loading state from the state
export const selectIsLoading = state => state.contacts.isLoading;

// Select the error state from the state
export const selectError = state => state.contacts.error;

// Select visible contacts based on the filter value
export const selectVisibleContacts = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) => {
    // Normalize the filter value to lowercase for case-insensitive comparison
    const normalizeFilter = filter.toLowerCase();

    // Filter and sort contacts based on the normalized filter value
    return contacts
      .filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
);
