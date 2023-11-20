// Import necessary dependencies and components
import { useSelector } from 'react-redux';
import { ContactItem } from '../ContactItem/ContactItem';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { Container } from '@mui/material';

// Define the ContactList functional component
export const ContactList = () => {
  // Select visible contacts from the store
  const visibleContacts = useSelector(selectVisibleContacts);

  // JSX structure for the ContactList component
  return (
    <Container
      maxWidth="md"
      sx={{
        p: 4,
        mt: 4,
        bgcolor: '#ffffff',
        borderRadius: '10px',
        boxShadow: 3,
      }}
      component="ul"
    >
      {/* Map through visibleContacts and render ContactItem component for each contact */}
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id} id={id} name={name} number={number} />
      ))}
    </Container>
  );
};
