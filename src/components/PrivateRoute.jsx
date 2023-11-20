// Import necessary dependencies and components
import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';

// Define the PrivateRoute component
const PrivateRoute = ({ children }) => {
  // Check if the user is logged in
  const { isLoggedIn } = useAuth();

  // Return the component if logged in, otherwise redirect to login
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Export the PrivateRoute component
export default PrivateRoute;
