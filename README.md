# 🗳️ Online Voting System with Blockchain

A secure and transparent digital voting platform leveraging blockchain technology for immutable vote recording.

![System Architecture](https://via.placeholder.com/800x400.png?text=System+Architecture+Diagram)
![Screenshot 2025-04-08 225815](https://github.com/user-attachments/assets/53df9611-e354-4289-a3c8-ca518f887198)
![Screenshot 2025-04-08 225744](https://github.com/user-attachments/assets/fa533bac-64fb-440e-8b6f-c1109b2c7d3e)

## 🌟 Features
- **Blockchain-powered** vote immutability
- OTP-based voter registration
- Real-time election results dashboard
- AES-256 encrypted transactions
- Voter authentication with JWT
- Tamper-evident voting mechanism
- Admin monitoring interface
- Voter eligibility verification

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB v6.0+
- Git
- NPM v9+

### Installation
1. **Clone Repository**
```bash
git clone https://github.com/yourusername/online-voting-system.git
cd online-voting-system


Backend Setup

bash
cd server
npm install
cp .env.example .env  # Update values in .env
Frontend Setup

bash
cd ../client
npm install
cp .env.example .env  # Set REACT_APP_API_URL
Environment Variables

ini
# server/.env
MONGO_URI=mongodb://localhost:27017/electionDB
JWT_SECRET=your_secure_secret
BLOCKCHAIN_NETWORK=local
OTP_EXPIRY=600000

# client/.env
REACT_APP_API_URL=http://localhost:5000
Run Application

bash
# Start backend
cd server && npm start

# Start frontend (new terminal)
cd client && npm start
📂 Project Structure
online-voting-system/
├── client/                 # React Frontend
│   ├── public/            # Static assets
│   ├── src/               # Source files
│   │   ├── components/    # UI Components
│   │   ├── pages/         # Application views
│   │   └── utils/         # Helper functions
├── server/                # Node.js Backend
│   ├── config/            # Configuration
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── utils/             # Blockchain utilities
│   └── index.js           # Server entry
├── .gitignore             # Ignore patterns
└── README.md              # This document
🔧 Configuration
Component	File	Key	Description
Backend	server/.env	JWT_SECRET	Authentication secret key
Backend	server/.env	MONGO_URI	MongoDB connection string
Frontend	client/.env	REACT_APP_API_URL	Backend API base URL
🛡️ Security Implementation
SHA-256 hashing for blockchain transactions

Role-based access control (RBAC)

Rate limiting (100 requests/minute)

Input validation middleware

Helmet.js for header security

CSRF protection tokens

Automated security audits with npm audit

