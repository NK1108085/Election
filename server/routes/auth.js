const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/otp');

// Register User
router.post('/register', async (req, res) => {
  try {
    const { email, voterId, mobile } = req.body;
    
    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { mobile },
        { email: email.toLowerCase() },
        { voterId: voterId.toUpperCase() }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'User already exists with these credentials' 
      });
    }

    const { otp, expiry } = generateOTP();
    const newUser = new User({
      ...req.body,
      email: email.toLowerCase(),
      voterId: voterId.toUpperCase(),
      otp,
      otpExpiry: expiry
    });

    await newUser.save();
    await sendOTP(mobile, otp);

    res.status(201).json({ 
      success: true,
      message: 'OTP sent to registered mobile number' 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ 
      mobile,
      otpExpiry: { $gt: Date.now() }
    }).select('+otp +otpExpiry');

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ 
      success: true,
      message: 'Account verified successfully' 
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'OTP verification failed'
    });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: 'Mobile number not registered' 
      });
    }

    const { otp, expiry } = generateOTP();
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    await sendOTP(mobile, otp);

    res.json({ 
      success: true,
      message: 'New OTP sent successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { voterId, password } = req.body;
    
    if (!voterId || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ 
        success: false,
        error: 'Voter ID and password are required' 
      });
    }

    const cleanVoterId = voterId.toString().trim().toUpperCase();
    const cleanPassword = password.toString().trim();

    console.log(`Searching for user: ${cleanVoterId}`);
    const user = await User.findOne({ voterId: cleanVoterId })
                         .select('+password')
                         .lean();

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log('User found:', user);
    console.log('Stored password hash:', user.password);

    const isMatch = await bcrypt.compare(cleanPassword, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log('Password matched');
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log('Generated token:', token);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        voterId: user.voterId,
        hasVoted: user.hasVoted 
      }
    });

  } catch (err) {
    console.error('Login error:', err.stack); // Detailed error logging
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;