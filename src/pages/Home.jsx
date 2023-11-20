// Import necessary dependencies and components
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/material/styles';

// Define the MainBox styled component
const MainBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

// Define the theme for MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d9d9dc',
    },
  },
  typography: {
    button: {
      fontFamily: 'Ubuntu',
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

// Define the Home component
const Home = () => {
  // Retrieve data from the useAuth hook
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Handle the start button click
  const handleStart = () => {
    isLoggedIn ? navigate('/contacts') : navigate('/login');
  };

  // Render the Home component
  return (
    <ThemeProvider theme={theme}>
      {/* Set the page title using Helmet */}
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* MainBox component */}
      <MainBox component="main">
        {/* PhoneApp title */}
        <Typography
          sx={{
            mb: 1,
            fontSize: {
              xs: '30px',
              sm: '40px',
              md: '52px',
            },
          }}
          variant="h2"
          fontWeight="500"
          fontFamily="Ubuntu"
          color="#1976d2"
          maxWidth="480px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="40px"
        >
          All your <br />
          phonebook <br /> contacts in
        </Typography>

        {/* PhoneApp brand */}
        <Typography
          sx={{
            mb: {
              xs: 2.5,
              sm: 3,
              md: 6,
            },
            fontSize: {
              xs: '34px',
              sm: '44px',
              md: '56px',
            },
          }}
          variant="h1"
          fontWeight="700"
          fontFamily="Ubuntu"
          color="#ffffff"
          maxWidth="480px"
          marginLeft="auto"
          marginRight="auto"
        >
          PhoneApp
        </Typography>

        {/* Start button */}
        <Button
          type="button"
          variant="contained"
          aria-label="Start"
          size="large"
          color="primary"
          marginLeft="24px"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={handleStart}
        >
          Get started
        </Button>
      </MainBox>
    </ThemeProvider>
  );
};

// Export the Home component
export default Home;
