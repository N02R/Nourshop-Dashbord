import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// استيراد المكونات الثابتة
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';

// تفعيل Lazy Loading لتحسين الأداء
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const AddProduct = lazy(() => import('./pages/AddProduct')); 
const Users = lazy(() => import('./pages/Users'));          

function App() {
  // 1. إدارة وضع الثيم (Dark/Light)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  // 2. التحقق من تسجيل الدخول (محاكاة بسيطة)
  // في المشاريع الحقيقية نستخدم Context API أو Redux هنا
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Suspense 
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ background: darkMode ? '#121212' : '#f8f9fa' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      {/* مكتبة الإشعارات (Toaster) */}
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
          success: {
            iconTheme: { primary: '#6c5ce7', secondary: '#fff' },
          },
        }}
      />

      <Routes>
        {/* المسار المستقل لصفحة تسجيل الدخول */}
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        
        {/* هيكل النظام الرئيسي (Protected Layout) */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <div className="d-flex" style={{ minHeight: '100vh', background: darkMode ? '#121212' : '#f8f9fa' }}>
                
                {/* القائمة الجانبية */}
                <Sidebar darkMode={darkMode} />

                {/* المحتوى الرئيسي (Navbar + Main Page) */}
                <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                  
                  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                  
                  <main 
                    className={`p-3 p-md-4 flex-grow-1 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} 
                    style={{ overflowY: 'auto' }}
                  >
                    <Routes>
                      <Route index element={<Dashboard darkMode={darkMode} />} />
                      <Route path="products" element={<Products darkMode={darkMode} />} />
                      <Route path="add-product" element={<AddProduct darkMode={darkMode} />} />
                      <Route path="edit-product/:id" element={<AddProduct darkMode={darkMode} />} />
                      <Route path="users" element={<Users darkMode={darkMode} />} />
                      
                      {/* إعادة توجيه أي مسار خطأ داخل الداشبورد إلى الرئيسية */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>

                </div>
              </div>
            ) : (
              // إذا لم يكن مسجلاً للدخول، يتم تحويله للـ Login
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Suspense>
  );
}

export default App;