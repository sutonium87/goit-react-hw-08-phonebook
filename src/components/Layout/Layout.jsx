// Import necessary dependencies and components
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Bar } from 'components/AppBar/AppBar';
import { Container } from '@mui/material';
import { Footer } from 'components/Footer/Footer';

// Define the Layout functional component
export const Layout = () => {
  // JSX structure for the Layout component
  return (
    <Container maxWidth="md">
      {/* Render AppBar component */}
      <Bar />

      {/* Use Suspense to render the nested routes */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>

      {/* Render Footer component */}
      <Footer />

      {/* Render Toaster for displaying notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

// Export Layout component as default
export default Layout;
