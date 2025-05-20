import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Page from './Page';
import Manage from './Manage';
import Logout from'./Logout';
import ReleaseLog from './ReleaseLog';
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: isOpen ? '200px' : '60px',
            background: '#000',
            color: 'white',
            padding: '10px',
            height: '100vh',
            transition: 'width 0.3s ease'
          }}
        >
          {/* Hamburger inside sidebar */}
          <button
            onClick={toggleSidebar}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              background: 'none',
              color: 'white',
              border: 'none',
              marginBottom: '20px'
            }}
          >
            ☰
          </button>

          {/* Only show menu if sidebar is open */}
          {isOpen && (
            <>
              <h2 style={{ marginTop: 0 }}>Fanatec</h2>
              <ul style={{ listStyle: 'none', padding: 0 , textDecoration:'none' }}>
                <li style={{marginBottom:'10px'}}><Link to="/" style={{ color: 'white', textDecoration: 'none'}}> 🏠 Home</Link></li>
                <li style={{marginBottom:'10px'}}><Link to="/manage" style={{ color: 'white', textDecoration: 'none'}}> 📊 Manage</Link></li>
                <li style={{marginBottom:'10px'}}><Link to="/releaselog" style={{ color: 'white', textDecoration: 'none'}}> 🔧 Release Log</Link></li>
                <li style={{position: 'fixed',bottom: '40px',left: '20px',color: 'var(--text-color)',  zIndex: 9999,}}><Link to="/logout" style={{ color: 'white', textDecoration: 'none'}}> 👤 Log out</Link></li>
              </ul>
            </>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/releaselog" element={<ReleaseLog/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Sidebar;
