// Slice for managing filter state using createSlice from @reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the filter
const initialState = {
  filter: '',
};

// Slice for filter state with updateFilter reducer
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Reducer to update the filter state
    updateFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

// Export the reducer and action for filter state
export const filterReducer = filterSlice.reducer;
export const { updateFilter } = filterSlice.actions;
