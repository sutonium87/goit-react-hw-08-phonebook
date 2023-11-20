// Import necessary dependencies and components
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { EditModal } from 'components/Modal/Modal';
import { selectIsLoading } from 'redux/contacts/selectors';
import { Loader } from 'components/Loader/Loader';

// Define the ContactItem functional component
export const ContactItem = ({ id, name, number }) => {
  // Redux setup: dispatch and selectIsLoading from the store
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const operation = useSelector(selectIsLoading);

  // Handle contact deletion
  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(id)).unwrap();
      Notify.success(`${name} was deleted from contacts`);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle the visibility of the edit modal
  const toggleModal = () => setIsShowModal(prev => !prev);

  // JSX structure for the ContactItem component
  return (
    <>
      <Grid
        container
        sx={{ mb: { xs: 4, sm: 4, md: 1 } }}
        spacing={1}
        columns={{ xs: 12, sm: 12, md: 16 }}
      >
        {/* Display contact name */}
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            paragraph
            sx={{
              fontSize: {
                xs: '16px',
                sm: '18px',
              },
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
            fontWeight="500"
            color="#212121"
          >
            {name}
          </Typography>
        </Grid>

        {/* Display contact phone number */}
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            sx={{
              fontSize: {
                xs: '16px',
                sm: '18px',
              },
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
            color="#757575"
            paragraph
          >
            {number}
          </Typography>
        </Grid>

        {/* Delete button with loading state indicator */}
        <Grid item xs={6} md>
          <Button
            type="button"
            variant="outlined"
            aria-label="delete"
            size="small"
            color="primary"
            startIcon={operation === id ? <Loader /> : <DeleteIcon />}
            onClick={handleDelete}
          >
            {operation === id ? 'Deleting...' : 'Delete'}
          </Button>
        </Grid>

        {/* Edit button */}
        <Grid item xs={6} md>
          <Button
            type="button"
            variant="contained"
            aria-label="edit"
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={toggleModal}
          >
            Edit
          </Button>
        </Grid>
      </Grid>

      {/* Render the EditModal component when isShowModal is true */}
      {isShowModal && (
        <EditModal
          onClose={toggleModal}
          id={id}
          name={name}
          number={number}
          isOpen={isShowModal}
        />
      )}
    </>
  );
};

// Prop types for ContactItem component
ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
