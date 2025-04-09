import React from 'react';
import logo from '/Logopic.png'

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  const firmName = localStorage.getItem('firmName');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="d-flex align-items-center">
        <img src={logo} alt="logo" width="45" height="40" className="me-2" />
        <span className="navbar-brand mb-0 h1">Vendor Dashboard</span>
      </div>
      
      <div className="ms-auto d-flex align-items-center gap-3 text-white">
        <h6 className="mb-0">Firm Name: {firmName}</h6>
        {!showLogOut ? (
          <>
            <span role="button" onClick={showLoginHandler} className="text-info">Login /</span>
            <span role="button" onClick={showRegisterHandler} className="text-info">Register</span>
          </>
        ) : (
          <span role="button" onClick={logOutHandler} className="text-danger fw-bold">Logout</span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
