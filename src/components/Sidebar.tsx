import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faBoxOpen, 
  faUserShield, 
  faPlusCircle,
  faStore
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

interface SidebarProps {
  darkMode: boolean;
}

function Sidebar({ darkMode }: SidebarProps) {

  const menuItems = [
    { name: 'Dashboard', icon: faChartLine, path: '/' },
    { name: 'Inventory', icon: faBoxOpen, path: '/products' },
    { name: 'Add Product', icon: faPlusCircle, path: '/add-product' },
    { name: 'User Management', icon: faUserShield, path: '/users' },
  ];

  return (
    <div 
      className={`d-flex flex-column flex-shrink-0 p-3 shadow-lg transition-all ${
        darkMode ? 'bg-dark border-end border-secondary' : 'bg-white border-end'
      }`} 
      style={{ 
        width: '220px', 
        height: '100vh', 
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: 1030,
        overflowY: 'auto'
      }}
    >
      
      {/* Brand */}
      <div className="d-flex align-items-center mb-4 px-2">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow"
          style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #6c5ce7, #8e44ad)' 
          }}
        >
          <FontAwesomeIcon icon={faStore} className="text-white fs-5" />
        </div>

        <span 
          className={`fs-5 fw-bold ${darkMode ? 'text-white' : 'text-dark'}`} 
          style={{ letterSpacing: '-0.5px' }}
        >
          Nours<span style={{ color: '#6c5ce7' }}>hope</span>
        </span>
      </div>

      <hr className={darkMode ? 'text-secondary opacity-25' : 'text-muted opacity-25'} />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${
                  isActive 
                    ? 'active-link shadow-sm' 
                    : (darkMode 
                        ? 'text-light opacity-75 hover-bg-dark' 
                        : 'text-secondary hover-bg-light')
                }`
              }
            >
              <div style={{ width: '25px', textAlign: 'center' }}>
                <FontAwesomeIcon icon={item.icon} />
              </div>

              <span className="fw-medium">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto text-center">
        <small 
          className="text-muted fw-semibold d-block" 
          style={{ fontSize: '11px', letterSpacing: '1px' }}
        >
          NOURSHOPE 2026
        </small>

        <a 
          href="https://www.instagram.com/nourr.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-decoration-none small d-inline-flex align-items-center gap-1 mt-1"
        >
          <FontAwesomeIcon icon={faInstagram} />
          nourr.dev
        </a>
      </div>

      {/* Styles */}
      <style>{`
        .transition-all { 
          transition: all 0.3s ease; 
        }
        
        .active-link {
          background: linear-gradient(45deg, #6c5ce7, #8e44ad) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3) !important;
        }

        .hover-bg-light:hover { 
          background-color: #f8f9fa; 
          color: #6c5ce7 !important;
          transform: translateX(5px);
        }

        .hover-bg-dark:hover { 
          background-color: #2d2d2d; 
          color: white !important;
          transform: translateX(5px);
        }

        .cursor-pointer { 
          cursor: pointer; 
        }
      `}</style>

    </div>
  );
}

export default Sidebar;
