require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');
const voteRoutes = require('./routes/vote');
const resultsRoutes = require('./routes/results');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Netlify URL (set later)
    'http://localhost:3000' // Keep for local testing
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.use('/api', routes);

app.use('/api/vote', voteRoutes);
app.use('/api/results', resultsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('MongoDB connection state:', mongoose.connection.readyState);
});