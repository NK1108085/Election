const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  mobile: { 
    type: String, 
    required: [true, 'Mobile is required'],
    unique: true,
    match: [/^\d{10}$/, 'Invalid mobile number']
  },
  aadhar: { 
    type: String, 
    required: [true, 'Aadhar is required'],
    unique: true,
    match: [/^\d{12}$/, 'Invalid Aadhar number']
  },
  voterId: { 
    type: String, 
    required: [true, 'Voter ID is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be 8+ characters'],
    select: false
  },
  hasVoted: { 
    type: Boolean, 
    default: false 
  },
  otp: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(new Error('Password hashing failed'));
  }
});

module.exports = mongoose.model('User', userSchema);