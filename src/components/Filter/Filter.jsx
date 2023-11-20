// Import necessary dependencies and components
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/contacts/selectors';
import { Container, TextField, Typography } from '@mui/material';

// Define the Filter functional component
export const Filter = () => {
  // Select filter value and dispatch function from the store
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  // Handle change in the filter input
  const handleChangeFilter = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  // JSX structure for the Filter component
  return (
    <Container maxWidth="sm">
      {/* Display filter instruction */}
      <Typography sx={{ mb: 1 }} fontSize="22px" color="#212121" paragraph>
        Find contacts by name:
      </Typography>

      {/* Filter input field */}
      <TextField
        sx={{ my: 0.5 }}
        margin="normal"
        fullWidth
        name="filter"
        value={filter}
        size="small"
        onChange={handleChangeFilter}
      />
    </Container>
  );
};
