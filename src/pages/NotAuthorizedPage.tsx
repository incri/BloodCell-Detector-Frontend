// NotAuthenticatedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorizedPage: React.FC = () => {
  return (
    <div>
      <h1>Not Authorized</h1>
      <p>You does not have authrorization to acess this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotAuthorizedPage;
