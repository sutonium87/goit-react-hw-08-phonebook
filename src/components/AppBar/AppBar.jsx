// Import custom hook for authentication status
import { useAuth } from 'hooks';

// Import Material-UI components and custom components
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { AuthNav } from 'components/AuthNav/AuthNav';

// Import styles for the component
import css from './AppBar.module.css';
import { styled } from '@mui/material/styles';

// Style the AppBar component with transparent background and no box-shadow
const AppBars = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

// Define the functional component Bar
export const Bar = () => {
  // Extract isLoggedIn status from the useAuth hook
  const { isLoggedIn } = useAuth();

  // JSX structure for the Bar component
  return (
    <AppBars className={css.maintoolbar} position="static">
      {/* Toolbar containing the Navigation component and either UserMenu or AuthNav based on login status */}
      <Toolbar className={css.toolbar} component="nav">
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Toolbar>
    </AppBars>
  );
};
