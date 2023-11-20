// Import the font styles for different weights of the Ubuntu font
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';

// Import the LoginForm component from the specified path
import { LoginForm } from 'components/LoginForm/LoginForm';

// Import the Helmet component from the react-helmet library
import { Helmet } from 'react-helmet';

// Define the Login component
const Login = () => {
  // Render the Login component
  return (
    <>
      {/* Set the page title using Helmet */}
      <Helmet>
        <title>Login</title>
      </Helmet>

      {/* Render the LoginForm component */}
      <LoginForm />
    </>
  );
};

// Export the Login component
export default Login;
