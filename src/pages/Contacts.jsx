// Import necessary dependencies and components
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/contacts/selectors';
import { Loader } from 'components/Loader/Loader';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

// Define the Contacts component
const Contacts = () => {
  // Retrieve data from the Redux store
  const error = useSelector(selectError);
  const visibleContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();
  const operation = useSelector(selectIsLoading);

  // Fetch contacts when the component mounts
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Render the Contacts component
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: 3,
        marginBottom: 3,
        minHeight: '80vh',
        textAlign: 'center',
      }}
    >
      {/* Set the page title using Helmet */}
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      {/* Phonebook title */}
      <Typography
        sx={{ mb: 3 }}
        variant="h1"
        fontSize="44px"
        fontWeight="700"
        color="#1976d2"
        gutterBottom
      >
        Phonebook
      </Typography>

      {/* Contact form */}
      <ContactForm />

      {/* Contacts title */}
      <Typography
        sx={{ mb: 3 }}
        variant="h2"
        fontSize="34px"
        fontWeight="500"
        color="#1976d2"
        gutterBottom
      >
        Contacts
      </Typography>

      {/* Filter for contacts */}
      <Filter />

      {/* Display loader if fetching data */}
      {operation === 'fetch' && !error && <Loader />}

      {/* Display message if no contacts */}
      {visibleContacts.length === 0 ? (
        <Typography
          sx={{ my: 2 }}
          fontSize="18px"
          color="#1976d2"
          fontWeight="700"
          paragraph
          align="center"
        >
          There are no contacts yet
        </Typography>
      ) : (
        // Display the contact list
        <ContactList />
      )}
    </Container>
  );
};

// Export the Contacts component
export default Contacts;
