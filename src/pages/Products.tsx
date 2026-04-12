import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faSearch, faFilter, faEdit, 
  faTrashAlt, faTag, faDollarSign, 
  faExclamationCircle, faBoxes, faArrowTrendUp, faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

// 1. تعريف واجهة البيانات (Interface)
interface Product {
  id: string;
  name: string;
  price: number;
  status: string; 
  category: string;
  img?: string;
  stockCount?: number | string;
}

interface ProductsProps {
  darkMode: boolean;
}

// 2. تحديث البيانات الافتراضية لتشير إلى مجلد الصور في الـ public
// ملاحظة: تأكد من تسمية الصور في مجلد public/images بنفس هذه الأسماء
const DEFAULT_PRODUCTS: Product[] = [
  { id: '101', name: 'Apple iPhone 15', price: 1200, status: 'متوفر', category: 'Electronics', img: '/images/AppleiPhone15.jpg', stockCount: 50 },
  { id: '102', name: 'Samsung Galaxy S23', price: 950, status: 'غير متوفر', category: 'Electronics', img: '/images/SamsungGalaxyS23.jpg', stockCount: 0 },
  { id: '103', name: 'Sony Headphones', price: 150, status: 'متوفر', category: 'Audio', img: '/images/SonyHeadphones.jpg', stockCount: 120 },
  { id: '104', name: 'Nike Air Max', price: 200, status: 'متوفر', category: 'Shoes', img: '/images/NikeAirMax.jpg', stockCount: 80 },
  { id: '105', name: 'Coffee Maker', price: 80, status: 'غير متوفر', category: 'Home Appliances', img: '/images/CoffeeMaker.jpg', stockCount: 0 },
];

function Products({ darkMode }: ProductsProps) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // حذف المنتج
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      toast.success(`تم حذف ${productToDelete.name} بنجاح`, {
        style: { borderRadius: '12px', background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }
      });
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // البحث والفلترة
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`animate__animated animate__fadeIn p-1 ${darkMode ? 'text-white' : 'text-dark'}`}>
      
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1 fs-3 fs-md-2">Inventory Management</h2>
          <p className="opacity-50 small mb-0">Monitor and manage your Nourshope stock levels</p>
        </div>
        <button 
          className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
          style={{ background: 'linear-gradient(45deg, #6c5ce7, #8e44ad)', border: 'none', borderRadius: '12px' }}
          onClick={() => navigate('/add-product')}
        >
          <FontAwesomeIcon icon={faPlus} /> <span className="text-nowrap">Add New Product</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Products', val: products.length, icon: faBoxes, color: 'primary' },
          { label: 'In Stock', val: products.filter(p => p.status === 'متوفر').length, icon: faArrowTrendUp, color: 'success' },
          { label: 'Out of Stock', val: products.filter(p => p.status !== 'متوفر').length, icon: faTriangleExclamation, color: 'danger' }
        ].map((stat, i) => (
          <div className="col-12 col-md-4" key={i}>
            <div className={`p-3 rounded-4 shadow-sm d-flex align-items-center gap-3 ${darkMode ? 'bg-dark border border-secondary' : 'bg-white'}`}>
              <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded-3 text-${stat.color}`}><FontAwesomeIcon icon={stat.icon} size="lg" /></div>
              <div><small className="text-muted d-block">{stat.label}</small><span className="fw-bold fs-5">{stat.val} Items</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className={`card border-0 shadow-sm mb-4 p-3 ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '18px' }}>
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-8 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 opacity-50">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input 
              type="text" 
              className={`form-control border-0 py-2 ps-5 rounded-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} 
              placeholder="Search product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className={`input-group-text border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
                <FontAwesomeIcon icon={faFilter} className="small opacity-50" />
              </span>
              <select 
                className={`form-select border-0 py-2 rounded-end-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="متوفر">متوفر / In Stock</option>
                <option value="غير متوفر">غير متوفر / Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className={`card border-0 shadow-sm overflow-hidden ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
        <div className="table-responsive">
          <table className={`table table-hover align-middle mb-0 ${darkMode ? 'table-dark' : ''}`}>
            <thead>
              <tr className="opacity-50" style={{ fontSize: '13px' }}>
                <th className="ps-3 ps-md-4 py-3 border-0">Product Info</th>
                <th className="py-3 border-0 d-none d-md-table-cell">Category</th>
                <th className="py-3 border-0">Price</th>
                <th className="py-3 border-0 d-none d-lg-table-cell">Status</th>
                <th className="text-center py-3 border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className={darkMode ? 'border-secondary' : 'border-light'}>
                  <td className="ps-3 ps-md-4">
                    <div className="d-flex align-items-center py-2">
                      <img 
                        {/* 3. هنا سيتم استدعاء المسار المكتوب في المصفوفة فوق */}
                        src={product.img || '/images/default-placeholder.png'} 
                        alt={product.name} 
                        className="rounded-3 shadow-sm me-2 me-md-3 d-none d-sm-block"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        {/* إضافة معالج خطأ في حال عدم وجود الصورة */}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }}
                      />
                      <div className="text-truncate" style={{ maxWidth: '150px' }}>
                        <div className="fw-bold mb-0 text-truncate" style={{ fontSize: '13px' }}>{product.name}</div>
                        <small className="text-muted d-block" style={{ fontSize: '10px' }}>ID: #{product.id}</small>
                      </div>
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">
                    <span className={`badge fw-medium px-2 py-2 ${darkMode ? 'bg-dark text-info border border-info border-opacity-25' : 'bg-info-subtle text-info'}`} style={{ borderRadius: '8px', fontSize: '11px' }}>
                      <FontAwesomeIcon icon={faTag} className="me-1" /> {product.category}
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>
                      <FontAwesomeIcon icon={faDollarSign} className="small text-muted me-1" />
                      {Number(product.price).toLocaleString()}
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">
                    <div className={`badge rounded-pill px-3 py-1 ${product.status === 'متوفر' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ fontSize: '11px' }}>
                       {product.status}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1 gap-md-2">
                      <button className={`btn-action edit ${darkMode ? 'bg-dark text-info border border-secondary' : 'bg-light'}`} onClick={() => navigate(`/edit-product/${product.id}`)}>
                        <FontAwesomeIcon icon={faEdit} size="sm" />
                      </button>
                      <button className={`btn-action delete ${darkMode ? 'bg-dark text-danger border border-secondary' : 'bg-light'}`} onClick={() => { setProductToDelete(product); setShowDeleteModal(true); }}>
                        <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center p-5 opacity-50">No products found.</div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: '400px' }}>
            <div className={`modal-content border-0 shadow-lg p-3 ${darkMode ? 'bg-dark text-white border border-secondary' : 'bg-white'}`} style={{ borderRadius: '24px' }}>
              <div className="modal-body text-center">
                <div className="mb-3 text-danger fs-1"><FontAwesomeIcon icon={faExclamationCircle} /></div>
                <h5 className="fw-bold">Delete Product?</h5>
                <p className="opacity-75 small">Remove <b>{productToDelete?.name}</b> نهائياً؟</p>
                <div className="d-flex gap-2 justify-content-center mt-4">
                  <button className="btn btn-light px-4 rounded-3 fw-bold" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn btn-danger px-4 rounded-3 shadow-sm fw-bold" onClick={confirmDelete}>Delete Forever</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-action { width: 32px; height: 32px; border-radius: 10px; border: none; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
        @media (min-width: 768px) { .btn-action { width: 38px; height: 38px; } }
        .btn-action.edit:hover { background: #6c5ce7 !important; color: white !important; }
        .btn-action.delete:hover { background: #e17055 !important; color: white !important; }
      `}</style>
    </div>
  );
}

export default Products;