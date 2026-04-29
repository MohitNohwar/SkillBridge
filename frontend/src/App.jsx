import React from 'react';
import './RoleSelection.css';

function App() {
  return (
    <div className="role-selection-container">
      <h1>SkillBridge</h1>
      <h2>Choose your role</h2>
      <div className="roles">
        <div className="role-ball admin">
          Admin
        </div>
        <div className="role-ball client">
          Client
        </div>
        <div className="role-ball freelancer">
          Freelancer
        </div>
      </div>
    </div>
  );
}

export default App;
