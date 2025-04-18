const mongoose = require('mongoose');

// In Vote model (server/models/Vote.js)
const voteSchema = new mongoose.Schema({
  party: {
    type: String,
    required: true,
    enum: ['BJP', 'Congress', 'AAP'],
    unique: true
  },
  count: {
    type: Number,
    default: 0
  }
});

// Create collection if not exists
async function createVoteCollection() {
  try {
    await mongoose.connection.db.createCollection('votes');
    console.log('Votes collection created');
  } catch (err) {
    console.log('Votes collection already exists');
  }
}
createVoteCollection();

module.exports = mongoose.model('Vote', voteSchema);