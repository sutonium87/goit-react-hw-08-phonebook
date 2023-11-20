// Import necessary dependencies and components
import { Box, Link, Typography } from '@mui/material';

// Copyright component
function Copyright(props) {
  return (
    <Box color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography variant="body2" color="text.secondary">
        Developed at GoIT by{' '}
        <Link
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/sutonium87"
        >
          Suto Csaba
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

// Footer component
export const Footer = () => {
  // JSX structure for the Footer component
  return (
    <Box component="footer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'transparent',
          marginTop: '100px',
        }}
      >
        <Copyright sx={{ my: 1.5 }} />
      </Box>
    </Box>
  );
};
