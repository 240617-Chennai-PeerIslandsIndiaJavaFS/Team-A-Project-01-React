import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);
    
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    
    
    if (user) {
      setUser(user);
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'manager':
          navigate('/project-manager');
          break;
        case 'member':
          navigate('/team-member');
          break;
        case 'client':
          navigate('/client');
          break;
        default:
          navigate('/login');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
        <div className="forgot-password">
          <span>Forgot your password? </span>
          <a href="/ForgotPassword">Reset it here</a>
        </div>
      </form>
    </div>
  );
};

export default Login;