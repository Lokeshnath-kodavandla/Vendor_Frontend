import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeDots } from 'react-loader-spinner';
import './Register.css';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("✅ Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        alert("❌ Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { border: '1px solid black' };

  return (
    <div className="registerSection">
      {loading && 
        <div className="loaderSection">
          <ThreeDots 
            height="80" 
            width="80" 
            color="#f56f42" 
            ariaLabel="three-dots-loading"
            visible={true}
          />
          <p>🛠️ Hi, Your Registration is under process...</p>
        </div>
      }

      {!loading && 
        <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>
          <h3>📝 Vendor Register</h3>

          <label>🙍 Username</label>
          <input 
            type="text" 
            name='username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Enter your name' 
            style={inputStyle}
          /><br />

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
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            name='password' 
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
      }
    </div>
  );
};

export default Register;
