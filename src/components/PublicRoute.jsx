// Import necessary dependencies and components
import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

// Define the PublicRoute component
const PublicRoute = ({ children }) => {
  // Check if the user is not logged in
  const { isLoggedIn } = useAuth();

  // Return the component if not logged in, otherwise redirect to contacts
  return !isLoggedIn ? children : <Navigate to={'/contacts'} />;
};

// Export the PublicRoute component
export default PublicRoute;
