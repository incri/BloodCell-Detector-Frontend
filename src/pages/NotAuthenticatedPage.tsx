// NotAuthenticatedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthenticatedPage: React.FC = () => {
  return (
    <div>
      <h1>Not Authenticated</h1>
      <p>You need to log in to access this page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotAuthenticatedPage;
