import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    aadhar: '',
    voterId: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'voterId' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (step === 1) {
        // Frontend validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
          throw new Error('Invalid mobile number');
        }

        // Remove confirmPassword and format data
        const { confirmPassword, ...registrationData } = formData;
        const payload = {
          ...registrationData,
          email: registrationData.email.toLowerCase(),
          voterId: registrationData.voterId.toUpperCase()
        };

        await axios.post('http://localhost:5000/api/auth/register', payload);
        setStep(2);
        setSuccess(`OTP sent to ${formData.mobile}`);
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
          mobile: formData.mobile,
          otp
        });
        
        if (response.data.success) {
          navigate('/login', { 
            state: { 
              registrationSuccess: true,
              message: 'Registration successful! Please login.' 
            } 
          });
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>{step === 1 ? 'Voter Registration' : 'OTP Verification'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit number"
                  pattern="\d{10}"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  name="aadhar"
                  required
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhar"
                  pattern="\d{12}"
                />
              </div>

              <div className="form-group">
                <label>Voter ID</label>
                <input
                  type="text"
                  name="voterId"
                  required
                  value={formData.voterId}
                  onChange={handleInputChange}
                  placeholder="Enter your Voter ID"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password (min 8 chars)"
                  minLength="8"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  minLength="8"
                />
              </div>
            </>
          ) : (
            <div className="otp-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit OTP"
                maxLength="6"
                pattern="\d{6}"
                required
              />
              <p className="otp-instruction">
                OTP sent to {formData.mobile} (valid for 10 minutes)
              </p>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {step === 1 ? 'Send OTP' : 'Verify OTP'}
          </button>
        </form>

        {step === 2 && (
          <button 
            className="resend-btn"
            onClick={async () => {
              try {
                await axios.post('http://localhost:5000/api/auth/resend-otp', {
                  mobile: formData.mobile
                });
                setSuccess('New OTP sent successfully');
              } catch (err) {
                setError(err.response?.data?.error || err.message);
              }
            }}
          >
            Resend OTP
          </button>
        )}

        <p className="nav-link">
          {step === 1 ? 'Already registered? ' : 'Back to '}
          <a href={step === 1 ? '/login' : '/register'}>
            {step === 1 ? 'Login here' : 'Registration'}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;