import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results');
        if (response.data.success) {
          setResults(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="results-container">
      <h2>Election Results</h2>
      <div className="results-list">
        {results.map((party) => (
          <div key={party._id} className="result-item">
            <span className="party-name">{party.party}</span>
            <span className="vote-count">{party.count} votes</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;