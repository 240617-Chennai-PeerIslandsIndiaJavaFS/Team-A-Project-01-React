import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'member',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [emailValidation, setEmailValidation] = useState(false);
  const [showPasswordConstraints, setShowPasswordConstraints] = useState(false);
  const [showEmailConstraints, setShowEmailConstraints] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validatePassword = (password) => {
      const length = password.length >= 8;
      const uppercase = /[A-Z]/.test(password);
      const lowercase = /[a-z]/.test(password);
      const number = /\d/.test(password);
      const special = /[\W_]/.test(password);
      setPasswordValidation({ length, uppercase, lowercase, number, special });
    };
    if (passwordRef.current) {
      validatePassword(passwordRef.current.value);
    }
  }, [passwordRef.current?.value]);

  useEffect(() => {
    const validateEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      setEmailValidation(emailPattern.test(email));
    };
    validateEmail(formData.email);
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ ...formData, password: formData.password }); 
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Form data submitted:', formData);
      navigate('/login'); 
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          ref={usernameRef}
          required
        />
        {errors.username && <p className="invalid">{errors.username}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          ref={passwordRef}
          onFocus={() => setShowPasswordConstraints(true)}
          onBlur={() => setShowPasswordConstraints(false)}
          required
        />
        {showPasswordConstraints && (
          <div id="message">
            <p id="length" className={passwordValidation.length ? 'valid' : 'invalid'}>
              Minimum <b>8 characters</b>
            </p>
            <p id="uppercase" className={passwordValidation.uppercase ? 'valid' : 'invalid'}>
              An <b>uppercase</b> letter
            </p>
            <p id="lowercase" className={passwordValidation.lowercase ? 'valid' : 'invalid'}>
              A <b>lowercase</b> letter
            </p>
            <p id="number" className={passwordValidation.number ? 'valid' : 'invalid'}>
              A <b>number</b>
            </p>
            <p id="special" className={passwordValidation.special ? 'valid' : 'invalid'}>
              A <b>special character</b>
            </p>
          </div>
        )}
        {errors.password && <p className="invalid">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <p className="invalid">{errors.confirmPassword}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setShowEmailConstraints(true)}
          onBlur={() => setShowEmailConstraints(false)}
          required
        />
        {showEmailConstraints && (
          <div id="emailMessage">
            <p id="emailFormat" className={emailValidation ? 'valid' : 'invalid'}>
              Must be a valid <b>email address</b>
            </p>
          </div>
        )}
        {errors.email && <p className="invalid">{errors.email}</p>}

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && <p className="invalid">{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <p className="invalid">{errors.lastName}</p>}

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="admin">Admin</option>
          <option value="manager">Project Manager</option>
          <option value="member">Team Member</option>
          <option value="client">Client</option>
        </select>

        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        {errors.dateOfBirth && <p className="invalid">{errors.dateOfBirth}</p>}

        <button type="submit">Register</button>
        <br />
        <br />
        <div>
          <span>If already Registered: </span>
          <a href="./login">login here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;