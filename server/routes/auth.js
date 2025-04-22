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
    
    // Validate mobile format
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mobile number format (10 digits required)'
      });
    }

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
    
    try {
      const otpSent = await sendOTP(mobile, otp);
      if (!otpSent) {
        await User.deleteOne({ mobile });
        return res.status(500).json({
          success: false,
          error: 'Failed to send OTP'
        });
      }
    } catch (otpError) {
      await User.deleteOne({ mobile });
      return res.status(500).json({
        success: false,
        error: 'OTP service unavailable. Please try again later.'
      });
    }

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
    
    try {
      const otpSent = await sendOTP(mobile, otp);
      if (!otpSent) {
        return res.status(500).json({
          success: false,
          error: 'Failed to resend OTP'
        });
      }
    } catch (otpError) {
      return res.status(500).json({
        success: false,
        error: 'OTP service unavailable. Please try again later.'
      });
    }

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
    const { voterId, password } = req.body;
    
    if (!voterId || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Voter ID and password are required' 
      });
    }

    const cleanVoterId = voterId.toString().trim().toUpperCase();
    const cleanPassword = password.toString().trim();

    const user = await User.findOne({ voterId: cleanVoterId })
                         .select('+password')
                         .lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(cleanPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

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
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
