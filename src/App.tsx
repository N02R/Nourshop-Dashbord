import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// ثابتة
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';

// Lazy Loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const Users = lazy(() => import('./pages/Users'));

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ background: darkMode ? '#121212' : '#f8f9fa' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      {/* Toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: darkMode ? '#2d2d2d' : '#fff',
            color: darkMode ? '#fff' : '#333',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: darkMode ? '1px solid #444' : '1px solid #eee',
          },
        }}
      />

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login darkMode={darkMode} />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app-shell">
                
                {/* Sidebar */}
                <Sidebar darkMode={darkMode} />

                {/* Main Area */}
                <div className="main-area">
                  
                  {/* Navbar */}
                  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

                  {/* Content */}
                  <main
                    className={`app-content ${
                      darkMode ? 'bg-dark text-white' : 'bg-light text-dark'
                    }`}
                  >
                    <Routes>
                      <Route index element={<Dashboard darkMode={darkMode} />} />
                      <Route path="products" element={<Products darkMode={darkMode} />} />
                      <Route path="add-product" element={<AddProduct darkMode={darkMode} />} />
                      <Route path="edit-product/:id" element={<AddProduct darkMode={darkMode} />} />
                      <Route path="users" element={<Users darkMode={darkMode} />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>

                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {/* Styles */}
      <style>{`
        /* ===== Layout Base ===== */
        .app-shell {
          min-height: 100vh;
          display: flex;
          background: #f8f9fa;
        }

        /* ===== Sidebar space compensation ===== */
        .main-area {
          margin-left: 260px;
          width: calc(100% - 260px);
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        /* ===== Content Scroll ===== */
        .app-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        /* ===== Responsive (important) ===== */
        @media (max-width: 768px) {
          .main-area {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>
    </Suspense>
  );
}

export default App;

export default App;
