// Import necessary dependencies and components
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { selectIsAuthLoading } from 'redux/auth/selectors';
import { Loader } from 'components/Loader/Loader';

// Create a default MUI theme
const defaultTheme = createTheme();

// Define the LoginForm functional component
export function LoginForm() {
  // Define dispatch, navigate, and authOperation using React hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authOperation = useSelector(selectIsAuthLoading);

  // Handle form submission
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      // Dispatch login action with user credentials
      await dispatch(
        login({
          email: form.elements.email.value,
          password: form.elements.password.value,
        })
      ).unwrap();
      Notify.success(`Welcome, ${form.elements.email.value}!`);
      form.reset();
    } catch (error) {
      Notify.failure('Login failed. Please enter correct data!');
    }
  };

  // JSX structure for the LoginForm component
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Email input field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {/* Password input field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {/* Remember me checkbox */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {authOperation === 'login' ? <Loader /> : <>Sign In</>}
            </Button>

            {/* Forgot password and Sign Up links */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate('/register')}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
