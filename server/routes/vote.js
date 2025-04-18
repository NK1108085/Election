const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vote = require('../models/Vote');
const User = require('../models/User');

// Cast vote endpoint
router.post('/cast', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.hasVoted) {
      return res.status(400).json({ 
        success: false,
        error: 'You have already voted' 
      });
    }

    const { party } = req.body;
    
    // Validate party
    const validParties = ['BJP', 'Congress', 'AAP'];
    if (!validParties.includes(party)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid party selection'
      });
    }

    // Update vote count
    await Vote.findOneAndUpdate(
      { party },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    // Mark user as voted
    user.hasVoted = true;
    await user.save();

    res.json({ 
      success: true,
      message: 'Vote recorded successfully' 
    });
  } catch (err) {
    console.error('Voting error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

module.exports = router;