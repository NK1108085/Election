const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const voteRoutes = require('./vote');
const resultsRoutes = require('./results');

// Combine all routes
router.use('/auth', authRoutes);
router.use('/vote', voteRoutes);
router.use('/results', resultsRoutes);

module.exports = router;