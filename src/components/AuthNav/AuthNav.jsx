// Import NavLink from react-router-dom and styles
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

// Define the AuthNav functional component
export const AuthNav = () => {
  // JSX structure for AuthNav component with navigation links
  return (
    <>
      {/* Navigation link to the login page */}
      <NavLink className={css.link} to="/login">
        Login
      </NavLink>
      {/* Navigation link to the registration page */}
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
    </>
  );
};
