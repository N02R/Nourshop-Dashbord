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
    <div className={`sidebar ${darkMode ? 'dark' : 'light'}`}>
      
      {/* Brand */}
      <div className="brand">
        <div className="logo">
          <FontAwesomeIcon icon={faStore} className="text-white fs-5" />
        </div>

        <span className="brand-text">
          Nours<span>hope</span>
        </span>
      </div>

      <hr className="divider" />

      {/* Menu */}
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) =>
                `menu-item ${isActive ? 'active' : ''}`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="icon" />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="footer">
        <small>NOURSHOPE 2026</small>

        <a 
          href="https://www.instagram.com/nourr.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
          <span>nourr.dev</span>
        </a>
      </div>

      {/* Styles */}
      <style>{`
        .sidebar {
          width: 260px;
          height: 100%;
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          z-index: 1030;
          overflow-y: auto;
        }

        .dark {
          background: #1e1e2f;
          color: white;
          border-right: 1px solid #333;
        }

        .light {
          background: #fff;
          color: #333;
          border-right: 1px solid #eee;
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6c5ce7, #8e44ad);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }

        .brand-text {
          font-size: 18px;
          font-weight: bold;
        }

        .brand-text span {
          color: #6c5ce7;
        }

        /* Divider */
        .divider {
          opacity: 0.2;
          margin: 10px 0;
        }

        /* Menu */
        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: 0.3s;
        }

        .menu-item:hover {
          transform: translateX(5px);
          background: rgba(108, 92, 231, 0.1);
          color: #6c5ce7;
        }

        .menu-item.active {
          background: linear-gradient(45deg, #6c5ce7, #8e44ad);
          color: white;
        }

        .icon {
          width: 20px;
        }

        /* Footer */
        .footer {
          text-align: center;
          margin-top: auto;
          font-size: 12px;
          opacity: 0.8;
        }

        .footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
