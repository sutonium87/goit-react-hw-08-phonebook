// Import necessary dependencies and components
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Box, Button, Container, TextField } from '@mui/material';
import { Loader } from 'components/Loader/Loader';

// Define the ContactForm functional component
export const ContactForm = () => {
  // Redux setup: dispatch, selectContacts, and selectIsLoading from the store
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const operation = useSelector(selectIsLoading);

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Extract values from the form
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    // Check if the contact name already exists
    const newName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (newName) {
      Notify.warning(`${name} is already in contacts`);
      return;
    }

    // Check for empty fields
    if (name === '' || number === '') {
      Notify.warning('Fields cannot be empty!');
      return;
    }

    try {
      // Dispatch the addContact operation and display success notification
      await dispatch(addContact({ name: name, number: number })).unwrap();
      Notify.success(`${name} was added to your contacts`);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // JSX structure for the ContactForm component
  return (
    <Container
      maxWidth="xs"
      sx={{
        p: 4,
        mb: 4,
        bgcolor: '#ffffff',
        borderRadius: '10px',
        boxShadow: 3,
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Text field for entering contact name */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          size="small"
        />

        {/* Text field for entering contact phone number */}
        <TextField
          margin="normal"
          required
          fullWidth
          type="tel"
          id="number"
          label="Phone Number"
          name="number"
          size="small"
        />

        {/* Button for submitting the form, with conditional rendering based on the loading operation */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          size="medium"
        >
          {operation === 'add' ? <Loader /> : <>Add contact</>}
        </Button>
      </Box>
    </Container>
  );
};
