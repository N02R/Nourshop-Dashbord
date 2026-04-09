import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBell, 
  faMoon, 
  faSun, 
  faSignOutAlt,
  faBars // إضافة أيقونة القائمة للموبايل
} from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.clear(); 
    // التأكد من استبدال المسار الحالي بصفحة اللوج ان لمنع العودة للخلف
    navigate('/login', { replace: true });
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg border-bottom sticky-top px-3 px-md-4 py-2 transition-all ${
        darkMode ? 'bg-dark border-secondary' : 'bg-white border-light'
      }`}
      style={{ 
        backdropFilter: 'blur(15px)', 
        backgroundColor: darkMode ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.85)',
        zIndex: 1020,
        height: 'auto', // تغيير الارتفاع ليكون مرناً في الموبايل
        minHeight: '70px'
      }}
    >
      <div className="container-fluid p-0">
        
        {/* زر فتح القائمة الجانبية (يظهر فقط في الموبايل) */}
        <button className="navbar-toggler border-0 d-md-none" type="button" style={{ color: '#6c5ce7' }}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* 1. Global Search - يختفي في الشاشات الصغيرة جداً */}
        <div className="d-none d-lg-flex position-relative shadow-sm rounded-3 overflow-hidden" style={{ width: '300px' }}>
          <input 
            className={`form-control border-0 pe-5 py-2 ${darkMode ? 'bg-secondary bg-opacity-10 text-white' : 'bg-light text-dark'}`} 
            type="search" 
            placeholder="Search..." 
            style={{ fontSize: '13px', borderRadius: '8px', paddingLeft: '1.2rem' }}
          />
          <span className="position-absolute top-50 end-0 translate-middle-y pe-3 opacity-50" style={{ color: '#6c5ce7' }}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        <div className="ms-auto d-flex align-items-center gap-2 gap-md-3">
          
          {/* 2. Theme Toggle */}
          <button 
            className={`btn border-0 rounded-3 d-flex align-items-center justify-content-center shadow-sm ${
              darkMode ? 'btn-dark text-warning' : 'btn-light text-secondary'
            }`} 
            style={{ width: '38px', height: '38px', transition: '0.4s' }}
            onClick={() => setDarkMode(!darkMode)}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="fs-6" />
          </button>

          {/* 3. Notifications */}
          <button className={`btn border-0 position-relative rounded-3 d-flex align-items-center justify-content-center shadow-sm ${darkMode ? 'btn-dark text-light' : 'bg-light text-secondary'}`} 
                  style={{ width: '38px', height: '38px' }}>
            <FontAwesomeIcon icon={faBell} className="fs-6" />
            <span className="position-absolute top-0 end-0 p-1 bg-danger border border-2 border-white rounded-circle" 
                  style={{ width: '10px', height: '10px', marginTop: '6px', marginRight: '6px' }}>
            </span>
          </button>
          
          <div className="vr mx-1 opacity-10 d-none d-sm-block"></div>

          {/* 4. User Profile & Logout */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <div className="text-end d-none d-md-block">
              <p className="mb-0 fw-bold small" style={{ color: darkMode ? '#fff' : '#2d3436', fontSize: '12px' }}>Nour Eddin</p>
              <p className="mb-0 fw-medium" style={{ fontSize: '9px', color: '#6c5ce7' }}>Admin</p>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="btn btn-sm rounded-3 px-2 px-md-3 fw-bold shadow-sm border-0 text-white d-flex align-items-center gap-2 logout-btn"
              style={{ 
                fontSize: '11px', 
                background: 'linear-gradient(45deg, #6c5ce7, #8e44ad)',
                padding: '8px 15px',
              }}
            >
              <span className="d-none d-sm-inline">Logout</span>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .logout-btn:active {
          transform: scale(0.95);
        }
        /* تحسين مظهر الموبايل */
        @media (max-width: 576px) {
          .navbar { padding: 10px !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;