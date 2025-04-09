import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">Page Not Found</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
