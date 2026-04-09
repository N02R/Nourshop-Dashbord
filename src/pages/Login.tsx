import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserCredentials { username: string; password: string; }
interface UserSession { name: string; role: 'Admin' | 'Editor'; }
interface LoginProps { darkMode: boolean; }

function Login({ darkMode }: LoginProps) {
  const [credentials, setCredentials] = useState<UserCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === '123456') {
        localStorage.setItem('isAuthenticated', 'true');

        const userData: UserSession = { name: 'Nour Eddin', role: 'Admin' };
        localStorage.setItem('user', JSON.stringify(userData));

        toast.success(`Welcome back, ${userData.name}!`);
        navigate('/', { replace: true }); // Redirect للـ Dashboard
      } else {
        setLoading(false);
        setError('Invalid username or password!');
        toast.error('Login failed. Please check your credentials.');
      }
    }, 1000);
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
      <div className={`card border-0 shadow-lg p-4 ${darkMode ? 'bg-secondary bg-opacity-10 text-white border border-secondary' : 'bg-white'}`} style={{ width: '400px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#6c5ce7' }}>Nourshope 🛍️</h2>
          <p className={`${darkMode ? 'text-light opacity-50' : 'text-muted'} small`}>Smart Store Management - Admin Portal</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small border-0">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" className={`form-control border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}
              placeholder="admin"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" className={`form-control border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}
              placeholder="******"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <hr className={darkMode ? 'border-secondary' : ''} />
          <small className={`${darkMode ? 'text-light opacity-50' : 'text-muted'}`}>NourShope || @nourr.dev 2026</small>
        </div>
      </div>
    </div>
  );
}

export default Login;