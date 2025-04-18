const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID (without checking token in database)
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    // Attach user and token to request
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: 'Please authenticate with valid token' 
    });
  }
};

module.exports = auth;