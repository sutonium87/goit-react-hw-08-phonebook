// Import the font styles for different weights of the Ubuntu font
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';

// Import the RegisterForm component from the specified path
import { RegisterForm } from 'components/RegisterForm/RegisterForm';

// Import the Helmet component from the react-helmet library
import { Helmet } from 'react-helmet';

// Define the Register component
const Register = () => {
  // Render the Register component
  return (
    <>
      {/* Set the page title using Helmet */}
      <Helmet>
        <title>Registration</title>
      </Helmet>

      {/* Render the RegisterForm component */}
      <RegisterForm />
    </>
  );
};

// Export the Register component
export default Register;
