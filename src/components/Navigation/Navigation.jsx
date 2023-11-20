// Import necessary dependencies and components
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks';
import style from './Navigation.module.css';
import { Button } from '@mui/material';

// Define the Navigation functional component
export const Navigation = () => {
  // Get authentication status using useAuth hook
  const { isLoggedIn } = useAuth();

  // JSX structure for the Navigation component
  return (
    <nav className={style.nav}>
      {/* Home link/button */}
      <NavLink className={style.link} to="/">
        <Button
          type="button"
          variant="contained"
          aria-label="Start"
          size="large"
          color="primary"
        >
          Home
        </Button>
      </NavLink>

      {/* Contacts link (visible only when logged in) */}
      {isLoggedIn && (
        <NavLink className={style.link} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
