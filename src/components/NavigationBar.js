import React from 'react';

// Navigation bar for user greeting and sign out option.
const NavigationBar = ({ signOut, user }) => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#B4E9D6',
    padding: '16px 24px',
    color: '#333',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  };

  const logoStyle = {
    fontWeight: '700',
    fontSize: '20px',
    letterSpacing: '1px',
    cursor: 'pointer',
    color: '#333'
  };

  const rightSectionStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  };

  const signOutBtnStyle = {
    backgroundColor: '#FFE3E3',
    border: '1px solid #FFC9C9',
    borderRadius: '20px',
    padding: '8px 16px',
    color: '#333',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Save the Environment</div>
      <div style={rightSectionStyle}>
        <span style={{ fontSize: '15px' }}>
          Hello, {user?.username}
        </span>
        <button
          onClick={signOut}
          style={signOutBtnStyle}
          onMouseOver={e => e.target.style.backgroundColor = '#FFC9C9'}
          onMouseOut={e => e.target.style.backgroundColor = '#FFE3E3'}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
