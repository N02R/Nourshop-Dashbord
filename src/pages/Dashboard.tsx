import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, faChartLine, faDollarSign, faBox, faUsers, 
  faFire, faArrowUp, faArrowDown, faShoppingBag, 
  faExclamationTriangle, faCheckCircle, faEllipsisV 
} from '@fortawesome/free-solid-svg-icons';

interface DashboardProps {
  darkMode: boolean;
}

function Dashboard({ darkMode }: DashboardProps) {
  // إحصائيات علوية
  const stats = [
    { label: 'Total Revenue', value: '$12,500', icon: faDollarSign, trend: '+12.5%', up: true, color: '#6c5ce7' },
    { label: 'Active Orders', value: '156', icon: faShoppingBag, trend: '+8.2%', up: true, color: '#00cec9' },
    { label: 'New Customers', value: '42', icon: faUsers, trend: '+14%', up: true, color: '#fdcb6e' },
    { label: 'Bounce Rate', value: '24%', icon: faFire, trend: '-3%', up: false, color: '#e17055' }
  ];

  // بيانات الرسم البياني للمبيعات
  const salesData = [
    { name: 'Mon', sales: 4000, visits: 2400 },
    { name: 'Tue', sales: 3000, visits: 1398 },
    { name: 'Wed', sales: 5200, visits: 9800 },
    { name: 'Thu', sales: 4800, visits: 3908 },
    { name: 'Fri', sales: 6100, visits: 4800 },
    { name: 'Sat', sales: 7500, visits: 3800 },
    { name: 'Sun', sales: 8200, visits: 4300 },
  ];

  // بيانات توزيع الفئات
  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home', value: 300 },
  ];
  const COLORS = ['#6c5ce7', '#00cec9', '#fdcb6e'];

  // بيانات الطلبات الأخيرة
  const recentOrders = [
    { id: '#1254', customer: 'Ahmed Ali', status: 'Delivered', amount: '$120' },
    { id: '#1255', customer: 'Sara John', status: 'Pending', amount: '$85' },
    { id: '#1256', customer: 'Mona Salem', status: 'Processing', amount: '$210' },
  ];

  return (
    <div className={`animate__animated animate__fadeIn p-1 ${darkMode ? 'text-white' : 'text-dark'}`}>
      
      {/* 1. قسم التنبؤ الذكي المطور */}
      <div className={`card border-0 shadow-sm mb-4 overflow-hidden position-relative ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} 
           style={{ borderRadius: '24px' }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-4">
            <div className="rounded-3 me-3 d-flex align-items-center justify-content-center shadow" 
                 style={{ background: 'linear-gradient(45deg, #6c5ce7, #8e44ad)', width: '50px', height: '50px', color: 'white' }}>
              <FontAwesomeIcon icon={faRobot} className="fs-4" />
            </div>
            <div>
              <h5 className="fw-bold mb-0">Nourshope Smart Assistant</h5>
              <small className="opacity-50 text-uppercase tracking-wider">AI Analysis System v2.0</small>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 rounded-4 h-100" style={{ background: darkMode ? 'rgba(108, 92, 231, 0.15)' : 'rgba(108, 92, 231, 0.05)', border: '1px solid rgba(108, 92, 231, 0.2)' }}>
                <p className="small fw-bold mb-1" style={{ color: '#a29bfe' }}>
                  <FontAwesomeIcon icon={faChartLine} className="me-2" /> Revenue Forecast
                </p>
                <h3 className="fw-bold">$18,450</h3>
                <small className="opacity-75">Targeted by end of month</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded-4 h-100" style={{ background: darkMode ? 'rgba(253, 203, 110, 0.15)' : 'rgba(253, 203, 110, 0.05)', border: '1px solid rgba(253, 203, 110, 0.2)' }}>
                <p className="small fw-bold mb-1" style={{ color: '#fdcb6e' }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" /> Stock Alert
                </p>
                <h3 className="fw-bold">12 Items</h3>
                <small className="opacity-75">Running low in inventory</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded-4 h-100" style={{ background: darkMode ? 'rgba(0, 206, 201, 0.15)' : 'rgba(0, 206, 201, 0.05)', border: '1px solid rgba(0, 206, 201, 0.2)' }}>
                <p className="small fw-bold mb-1" style={{ color: '#00cec9' }}>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Store Health
                </p>
                <h3 className="fw-bold">Excellent</h3>
                <small className="opacity-75">98% customer satisfaction</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. بطاقات الإحصائيات السريعة */}
      <div className="row g-4 mb-4">
        {stats.map((stat, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card border-0 p-3 h-100 shadow-sm transition-all hover-up ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} 
                 style={{ borderRadius: '20px' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-50 d-block mb-1 fw-medium">{stat.label}</small>
                  <h4 className="fw-bold mb-1">{stat.value}</h4>
                  <span className={`badge rounded-pill ${stat.up ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{fontSize: '10px'}}>
                    <FontAwesomeIcon icon={stat.up ? faArrowUp : faArrowDown} className="me-1" />
                    {stat.trend}
                  </span>
                </div>
                <div className={`fs-4 p-2 rounded-3 ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{ color: stat.color }}>
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. الرسوم البيانية والجداول */}
      <div className="row g-4">
        {/* المبيعات الأسبوعية */}
        <div className="col-lg-8">
          <div className={`card border-0 p-4 shadow-sm h-100 ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Sales Analytics</h5>
              <button className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`} style={{borderRadius: '10px'}}>Monthly View</button>
            </div>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#444' : '#eee'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#888' : '#444', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: darkMode ? '#888' : '#444', fontSize: 12}} />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#2d3436' : '#fff', border: 'none', borderRadius: '12px', color: darkMode ? '#fff' : '#000', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="sales" stroke="#6c5ce7" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* توزيع الفئات */}
        <div className="col-lg-4">
          <div className={`card border-0 p-4 shadow-sm h-100 ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
            <h5 className="fw-bold mb-4">Categories Distribution</h5>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3">
              {categoryData.map((cat, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small opacity-75"><FontAwesomeIcon icon={faBox} className="me-2" style={{color: COLORS[i]}} /> {cat.name}</span>
                  <span className="fw-bold">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* جدول الطلبات الأخيرة */}
        <div className="col-lg-12">
          <div className={`card border-0 p-4 shadow-sm ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Recent Orders</h5>
              <FontAwesomeIcon icon={faEllipsisV} className="opacity-50 cursor-pointer" />
            </div>
            <div className="table-responsive">
              <table className={`table table-borderless align-middle ${darkMode ? 'table-dark' : ''}`} style={{backgroundColor: 'transparent'}}>
                <thead>
                  <tr className="opacity-50">
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} style={{borderBottom: darkMode ? '1px solid #333' : '1px solid #f8f9fa'}}>
                      <td className="fw-bold text-primary">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <span className={`badge rounded-pill ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="fw-bold">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-up:hover { transform: translateY(-5px); transition: 0.3s; }
        .cursor-pointer { cursor: pointer; }
        .bg-success-subtle { background-color: rgba(40, 167, 69, 0.15) !important; }
        .bg-danger-subtle { background-color: rgba(220, 53, 69, 0.15) !important; }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
}

export default Dashboard;