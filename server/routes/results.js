const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.get('/', async (req, res) => {
  try {
    const results = await Vote.find().sort({ count: -1 });
    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error('Results error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch results'
    });
  }
});

module.exports = router;