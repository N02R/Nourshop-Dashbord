import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, faUserShield, faUsers, 
  faUserCheck, faSyncAlt, faBan, 
  faEnvelope, faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';

// 1. Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Suspended';
  joinDate: string;
}

interface UsersProps {
  darkMode: boolean;
}

function Users({ darkMode }: UsersProps) {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active', joinDate: '2026-01-10' },
    { id: 2, name: 'Sara Mahmoud', email: 'sara@example.com', role: 'User', status: 'Active', joinDate: '2026-02-15' },
    { id: 3, name: 'Khaled Hassan', email: 'khaled@example.com', role: 'User', status: 'Suspended', joinDate: '2026-03-01' },
    { id: 4, name: 'Lina Nasser', email: 'lina@example.com', role: 'Admin', status: 'Active', joinDate: '2026-03-20' },
  ]);

  const toggleRole = (id: number): void => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: user.role === 'Admin' ? 'User' : 'Admin' } : user
    ));
  };

  const toggleStatus = (id: number): void => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user
    ));
  };

  return (
    <div className={`animate__animated animate__fadeIn ${darkMode ? 'text-white' : 'text-dark'}`}>
      
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Team Management</h2>
          <p className="opacity-50 small">Manage permissions and access levels for Nourshope members</p>
        </div>
        <button className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2" 
                style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #a855f7 100%)', border: 'none', borderRadius: '12px' }}>
          <FontAwesomeIcon icon={faUserPlus} />
          Invite Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4 text-center">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 h-100" 
               style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #6c5ce7 0%, #8e44ad 100%)', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="text-start">
                <small className="opacity-75 d-block mb-1">Total Users</small>
                <h3 className="fw-bold mb-0">{users.length}</h3>
              </div>
              <FontAwesomeIcon icon={faUsers} size="2x" className="opacity-25" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card border-0 shadow-sm p-3 h-100 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`} style={{ borderRadius: '20px' }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="text-start">
                <small className="text-muted d-block mb-1">Administrators</small>
                <h3 className="fw-bold mb-0" style={{ color: '#6c5ce7' }}>{users.filter(u => u.role === 'Admin').length}</h3>
              </div>
              <FontAwesomeIcon icon={faUserShield} size="2x" className="opacity-25 text-primary" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card border-0 shadow-sm p-3 h-100 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`} style={{ borderRadius: '20px' }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="text-start">
                <small className="text-muted d-block mb-1">Active Now</small>
                <h3 className="fw-bold mb-0 text-success">{users.filter(u => u.status === 'Active').length}</h3>
              </div>
              <FontAwesomeIcon icon={faUserCheck} size="2x" className="opacity-25 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Modern Users Table */}
      <div className={`card border-0 shadow-sm overflow-hidden ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className={darkMode ? 'table-dark' : 'bg-light'}>
              <tr style={{ fontSize: '13px', opacity: 0.7 }}>
                <th className="px-4 py-3 border-0">User Profile</th>
                <th className="py-3 border-0">Join Date</th>
                <th className="py-3 border-0">Role</th>
                <th className="py-3 border-0">Status</th>
                <th className="text-end px-4 py-3 border-0">Actions</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'text-white' : 'text-dark'}>
              {users.map(user => (
                <tr key={user.id} className="border-bottom border-secondary border-opacity-10">
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3 d-flex align-items-center justify-content-center shadow-sm" 
                           style={{ 
                             width: '45px', height: '45px', borderRadius: '14px', 
                             background: user.role === 'Admin' ? 'rgba(108, 92, 231, 0.2)' : 'rgba(100, 116, 139, 0.1)', 
                             color: user.role === 'Admin' ? '#6c5ce7' : '#64748b', 
                             fontWeight: 'bold' 
                           }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold mb-0" style={{ fontSize: '14px' }}>{user.name}</div>
                        <small className="opacity-50" style={{ fontSize: '12px' }}>
                          <FontAwesomeIcon icon={faEnvelope} className="me-1" /> {user.email}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <small className="opacity-75">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" /> {user.joinDate}
                    </small>
                  </td>
                  <td>
                    <span className={`badge px-3 py-2 fw-medium`} 
                          style={{ 
                            borderRadius: '10px', fontSize: '11px', 
                            backgroundColor: user.role === 'Admin' ? 'rgba(108, 92, 231, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                            color: user.role === 'Admin' ? '#6c5ce7' : '#64748b' 
                          }}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className={`d-flex align-items-center gap-2 ${user.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                      <span className="dot animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                      <small className="fw-bold" style={{ fontSize: '12px' }}>{user.status}</small>
                    </div>
                  </td>
                  <td className="text-end px-4">
                    <button className={`btn btn-sm btn-action me-2 ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                            onClick={() => toggleRole(user.id)} title="Switch Role">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                    <button className={`btn btn-sm btn-action ${user.status === 'Active' ? 'text-danger' : 'text-success'} ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                            onClick={() => toggleStatus(user.id)} title={user.status === 'Active' ? 'Ban User' : 'Activate User'}>
                      <FontAwesomeIcon icon={user.status === 'Active' ? faBan : faUserCheck} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .btn-action {
          border-radius: 10px;
          padding: 8px 12px;
          transition: all 0.2s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .avatar { transition: all 0.3s ease; }
        tr:hover .avatar {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </div>
  );
}

export default Users;