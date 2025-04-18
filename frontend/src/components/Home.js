import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-container">
          <h1>National Election Portal</h1>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/results">Results</a>
        </div>
      </nav>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h1>National Election Portal</h1>
            <p>
              A secure and transparent platform for citizens to cast their votes
              in the national election. Your vote is your voice in democracy.
            </p>
            <div className="hero-buttons">
              <button className="register-btn"><a href="/register">Register to Vote</a></button>
              
            </div>
          </div>
          <div className="hero-image">
          <img src="/images.jpg" alt="Election" />

          </div>
        </section>

        {/* Arrow Scroll Indicator */}
        <div className="down-arrow">&#8595;</div>

        <section className="election-info-section">
          <h1>Election Information</h1>
          <p>Learn about the democratic process and how the National Election works.</p>

          <div className="info-cards">
            <div className="info-card">
              <h2>Eligibility Criteria</h2>
              <ul>
                <li>Indian citizen</li>
                <li>18 years of age or above</li>
                <li>Registered in the electoral roll</li>
                <li>Possess a valid Voter ID card</li>
                <li>Not disqualified under any law</li>
              </ul>
            </div>

            <div className="info-card">
              <h2>Election Schedule</h2>
              <div className="schedule-item">
                <span>Registration Deadline:</span> May 15, 2025
              </div>
              <div className="schedule-item">
                <span>Voting Period Begins:</span> June 1, 2025
              </div>
              <div className="schedule-item">
                <span>Voting Period Ends:</span> June 15, 2025
              </div>
              <div className="schedule-item">
                <span>Results Announced:</span> June 20, 2025
              </div>
            </div>

            <div className="info-card">
              <h2>Required Documents</h2>
              <ul>
                <li>Aadhar Card</li>
                <li>Voter ID Card</li>
                <li>Valid mobile number for OTP verification</li>
                <li>Active email address</li>
                <li>Current residential address proof</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="election-process-section">
          <h1>Election Process</h1>
          <p>Understanding the complete journey of the electoral process</p>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h2>Voter Registration</h2>
                <p>Citizens register on the portal by providing their personal details, Aadhar number, and Voter ID. The registration is verified through OTP.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h2>Identity Verification</h2>
                <p>The system validates voter information against the electoral database to ensure eligibility and prevent duplicate registrations.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h2>Voting Period</h2>
                <p>During the designated voting period, registered voters can log in and cast their vote for their preferred candidate.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="election-rules-section">
          <h1>Election Rules</h1>
          <p>Important guidelines to ensure a fair and democratic election process</p>

          <div className="rules-container">
            <div className="rules-card">
              <h2>Voter Rules</h2>
              <ul className="rules-list">
                <li>✓ Each voter can cast only one vote during the election period</li>
                <li>✓ Voters must use their own credentials and not impersonate others</li>
                <li>✓ Voting decisions must be made independently without coercion</li>
                <li>✓ Once a vote is cast, it cannot be changed or withdrawn</li>
                <li>✓ Voters should ensure their contact information is up-to-date</li>
              </ul>
            </div>

            <div className="rules-card">
              <h2>System Rules</h2>
              <ul className="rules-list">
                <li>✓ The system maintains voter anonymity and vote confidentiality</li>
                <li>✓ Attempts to hack or manipulate the voting system are criminal offenses</li>
                <li>✓ The platform is accessible 24/7 during the voting period</li>
                <li>✓ System maintenance will be scheduled outside voting hours</li>
                <li>✓ Results are automatically tabulated and cannot be altered manually</li>
              </ul>
            </div>
          </div>
        </section>

        
      </main>

      <footer className="site-footer">
        <h2>@copyright nitinsingh 2025</h2>
      </footer>
    </div>
  );
}

export default Home;
