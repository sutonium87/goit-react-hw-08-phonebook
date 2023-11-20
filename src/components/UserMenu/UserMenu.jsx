// Import necessary dependencies and components
import { useAuth } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/auth/operations';
import css from './UserMenu.module.css';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';
import { selectIsAuthLoading } from 'redux/auth/selectors';
import { Loader } from 'components/Loader/Loader';

// Style the LogoutButton using MUI's styled function
const LogoutButton = styled(Button)`
  font-size: 12px;
  padding: 8px 22px;
  margin-top: 20px;
`;

// Define the functional component for the user menu
export const UserMenu = () => {
  // Initialize necessary hooks, dispatch, and selector
  const { user } = useAuth();
  const dispatch = useDispatch();
  const authOperation = useSelector(selectIsAuthLoading);

  // JSX structure for the user menu component
  return (
    <>
      <p className={css.user}>{user.name}</p>
      <LogoutButton
        variant="contained"
        aria-label="Start"
        size="large"
        color="primary"
        type="button"
        onClick={() => dispatch(logout())}
        endIcon={authOperation === 'logout' ? <Loader /> : <ExitToAppIcon />}
      >
        Logout
      </LogoutButton>
    </>
  );
};
