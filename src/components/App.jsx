// Import necessary dependencies and components
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout/Layout';
import { useAuth } from 'hooks';
import { refresh } from 'redux/auth/operations';
import { Loader } from './Loader/Loader';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { ThemeProvider, createTheme } from '@mui/material';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

// Create the MUI theme
const theme = createTheme({
  typography: {
    button: {
      fontFamily: 'Ubuntu',
    },
    h1: {
      fontFamily: 'Ubuntu',
    },
    h2: {
      fontFamily: 'Ubuntu',
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Define the main App component
export const App = () => {
  // Initialize necessary hooks and dispatch
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  // JSX structure for the main App component
  return (
    <ThemeProvider theme={theme}>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      )}
    </ThemeProvider>
  );
};
