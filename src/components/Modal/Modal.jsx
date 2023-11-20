// Import necessary dependencies and components
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Grid, TextField } from '@mui/material';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';

// Style definition for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

// Define the EditModal functional component
export const EditModal = ({ isOpen, id, name, number, onClose }) => {
  // Define state variables using React hooks
  const [contactName, setContactName] = React.useState(name);
  const [contactNumber, setContactNumber] = React.useState(number);

  // Define dispatch, operation, and contacts using React hooks
  const dispatch = useDispatch();
  const operation = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);

  // Handle edit submission
  const handleEdit = async e => {
    e.preventDefault();

    // Check if the edited name and number already exist in contacts
    const EditName = contacts.some(
      contact => contact.name.toLowerCase() === contactName.toLowerCase()
    );
    const EditNumber = contacts.some(
      contact => contact.number === contactNumber
    );

    // Show error notification if the edited contact already exists
    if (EditName && EditNumber) {
      Notify.error(`${contactName} is already in contacts`);
      return;
    }

    // Show warning notification if fields are empty
    if (contactName === '' || contactNumber === '') {
      Notify.warning('Fields cannot be empty!');
      return;
    }

    try {
      // Dispatch updateContact action with edited contact details
      await dispatch(
        updateContact({
          name: contactName,
          number: contactNumber,
          contactId: id,
        })
      ).unwrap();
      Notify.success(`${name} contact was changed`);
      onClose();
    } catch (error) {
      console.log(error);
      Notify.warning('Ooops!..Something went wrong! Please try again later');
    }
  };

  // JSX structure for the EditModal component
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: { xs: 240, sm: 400 } }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleEdit}
          >
            {/* Name input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={contactName}
              onChange={({ target: { value } }) => setContactName(value)}
            />

            {/* Phone number input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="tel"
              id="number"
              label="Phone Number"
              name="number"
              value={contactNumber}
              onChange={({ target: { value } }) => setContactNumber(value)}
            />

            {/* Save and Cancel buttons */}
            <Grid container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, mr: 2 }}
              >
                {operation === 'update' ? <Loader /> : <>Save</>}
              </Button>
              <Button
                type="button"
                size="medium"
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

// PropTypes for EditModal component
EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
