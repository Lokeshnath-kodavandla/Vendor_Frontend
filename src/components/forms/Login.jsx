import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { BeatLoader } from 'react-spinners';
import './Login.css';

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('✅ Login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("checking for VendorId:", vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName);
      }
    } catch (error) {
      alert("❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { border: '1px solid black' };

  return (
    <div className="loginSection">
      {loading && (
        <div className="loaderSection">
            <BeatLoader
              color="#f56f42"
              size={15}
              aria-label="beat-loader"
              loading={true}
            />
          <p>🔄 Logging in... Please wait</p>
        </div>
      )}

      {!loading && (
        <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
          <h3>🔐 Vendor Login</h3>
          <label>📧 Email</label>
          <input
            type="text"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            style={inputStyle}
          /><br />
          
          <label>🔑 Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            style={inputStyle}
          /><br />

          <span className='showPassword' onClick={handleShowPassword}>
            {showPassword ? '🙈 Hide' : '👁️ Show'}
          </span>

          <div className="btnSubmit">
            <button type='submit'>🚀 Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
