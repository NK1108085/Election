import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Voting.css';

function Voting() {
  const navigate = useNavigate();

  const handleVote = async (party) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/vote/cast', // Updated endpoint
        { party },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data.success) {
        // Update local user data
        const user = JSON.parse(localStorage.getItem('user'));
        user.hasVoted = true;
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/results');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Voting failed. Please try again.');
    }
  };

  return (
    <div className="voting-container">
      <h2>Select Your Preferred Party</h2>
      <div className="parties-list">
        <button onClick={() => handleVote('BJP')} className="party-btn">
          BJP
        </button>
        <button onClick={() => handleVote('Congress')} className="party-btn">
          Congress
        </button>
        <button onClick={() => handleVote('AAP')} className="party-btn">
          AAP
        </button>
      </div>
    </div>
  );
}

export default Voting;