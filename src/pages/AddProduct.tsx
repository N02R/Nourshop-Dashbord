import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBoxOpen, faDollarSign, faLayerGroup, 
  faInfoCircle, faImage, faCloudUploadAlt,
  faSave, faArrowLeft, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  description: string;
  status: string;
  img: string;
}

interface AddProductProps {
  darkMode: boolean;
}

function AddProduct({ darkMode }: AddProductProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  
  // رابط الـ API الخاص بـ JSON Server
  const API_URL = "http://localhost:5000/products";

  const [formData, setFormData] = useState<ProductFormData>({
    name: '', 
    price: '', 
    category: 'Electronics',
    description: '', 
    status: 'In Stock', 
    img: ''
  });

  const [loading, setLoading] = useState<boolean>(false);

  // 1. جلب بيانات المنتج إذا كنا في "نمط التعديل"
  useEffect(() => {
    if (isEditMode) {
      const fetchProductForEdit = async () => {
        try {
          const response = await fetch(`${API_URL}/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              name: data.name,
              price: data.price.toString(),
              category: data.category,
              description: data.description || '',
              status: data.status,
              img: data.img || ''
            });
          }
        } catch (error) {
          toast.error("خطأ في جلب بيانات المنتج");
        }
      };
      fetchProductForEdit();
    }
  }, [id, isEditMode]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, img: previewUrl }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    accept: { 'image/*': [] }, 
    multiple: false 
  });

  // 2. معالجة الإرسال (Submit) للسيرفر
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // تجهيز كائن المنتج (مطابق لهيكلية db.json)
    const productPayload = {
      name: formData.name,
      price: Number(formData.price), // تحويل السعر لرقم
      category: formData.category,
      description: formData.description,
      status: formData.status,
      img: formData.img,
    };

    try {
      const url = isEditMode ? `${API_URL}/${id}` : API_URL;
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload)
      });

      if (response.ok) {
        toast.success(isEditMode ? 'تم تحديث المنتج بنجاح' : 'تم نشر المنتج في المتجر', {
            style: { borderRadius: '15px' }
        });
        navigate('/products');
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast.error("خطأ أثناء الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`animate__animated animate__fadeIn pb-5 px-2 px-md-0 ${darkMode ? 'text-white' : 'text-dark'}`}>
      
      {/* Header Section */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3 mt-2">
        <div>
          <h2 className="fw-bold mb-1 fs-3">
            {isEditMode ? 'Edit Product Details' : 'Add New Product'}
          </h2>
          <p className="opacity-50 small mb-0">Nourshope Inventory Management System</p>
        </div>
        <button className="btn btn-outline-secondary rounded-pill px-4 btn-sm align-self-start" onClick={() => navigate('/products')}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          
          {/* Left: Input Fields */}
          <div className="col-lg-8 order-2 order-lg-1">
            <div className={`card border-0 shadow-sm p-4 mb-4 ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '25px' }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#6c5ce7' }}>
                <FontAwesomeIcon icon={faInfoCircle} /> General Information
              </h5>
              
              <div className="row g-3">
                <div className="col-12 mb-3">
                  <label className="form-label small fw-bold opacity-75">Product Name</label>
                  <div className="input-group shadow-sm rounded-3 overflow-hidden border-0">
                    <span className={`input-group-text border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
                      <FontAwesomeIcon icon={faBoxOpen} className="small opacity-50" />
                    </span>
                    <input type="text" className={`form-control custom-input border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} required 
                           placeholder="Enter product name..."
                           value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold opacity-75">Price (USD)</label>
                  <div className="input-group shadow-sm rounded-3 overflow-hidden">
                    <span className={`input-group-text border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
                      <FontAwesomeIcon icon={faDollarSign} className="small opacity-50" />
                    </span>
                    <input type="number" className={`form-control custom-input border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} required 
                           placeholder="0.00"
                           value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold opacity-75">Category</label>
                  <div className="input-group shadow-sm rounded-3 overflow-hidden">
                    <span className={`input-group-text border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
                      <FontAwesomeIcon icon={faLayerGroup} className="small opacity-50" />
                    </span>
                    <select className={`form-select custom-input border-0 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} value={formData.category} 
                            onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Smart Home</option>
                      <option>Accessories</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={`card border-0 shadow-sm p-4 ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '25px' }}>
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#6c5ce7' }}>
                <FontAwesomeIcon icon={faCheckCircle} /> Description
              </h5>
              <textarea className={`form-control custom-input border-0 shadow-sm ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} rows={6} 
                        placeholder="Tell us more about the product features..."
                        value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>

          {/* Right: Media & Publishing */}
          <div className="col-lg-4 order-1 order-lg-2">
            <div className={`card border-0 shadow-sm p-4 mb-4 text-center ${darkMode ? 'bg-secondary bg-opacity-10 border border-secondary' : 'bg-white'}`} style={{ borderRadius: '25px' }}>
              <h6 className="fw-bold mb-3 text-start"><FontAwesomeIcon icon={faImage} className="me-2" /> Media Gallery</h6>
              <div {...getRootProps()} className={`dropzone-box ${isDragActive ? 'active' : ''} ${darkMode ? 'dark-dz' : ''}`}>
                <input {...getInputProps()} />
                {formData.img ? (
                  <div className="position-relative">
                    <img src={formData.img} alt="Preview" className="img-fluid rounded-4 shadow-sm w-100" style={{ maxHeight: '280px', objectFit: 'cover' }} />
                    <div className="overlay-text">Click to change</div>
                  </div>
                ) : (
                  <div className="py-5">
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="fs-1 mb-3 text-primary opacity-50" />
                    <p className="small fw-bold mb-0">Drag & Drop Image</p>
                    <span className="text-muted" style={{fontSize: '11px'}}>Support: JPG, PNG, WEBP</span>
                  </div>
                )}
              </div>
            </div>

            <div className="vstack gap-2">
              <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2 border-0" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : (
                  <>
                    <FontAwesomeIcon icon={faSave} />
                    {isEditMode ? 'Save Changes' : 'Publish Product'}
                  </>
                )}
              </button>
              <button type="button" className="btn btn-link w-100 py-2 text-decoration-none text-muted fw-medium" onClick={() => navigate('/products')}>
                Cancel & Discard
              </button>
            </div>
          </div>

        </div>
      </form>

      <style>{`
        .custom-input { padding: 14px 18px !important; border-radius: 0 !important; transition: 0.3s; font-size: 0.95rem; }
        .custom-input:focus { background-color: ${darkMode ? '#1e1e1e' : '#fff'} !important; box-shadow: 0 0 0 2px #6c5ce733 !important; }
        .dropzone-box { border: 2px dashed #d1d5db; border-radius: 20px; cursor: pointer; transition: 0.3s; background: #f9fafb; overflow: hidden; }
        .dark-dz { background: #1a1a1a; border-color: #444; }
        .dropzone-box.active, .dropzone-box:hover { border-color: #6c5ce7; background: #6c5ce70a; }
        .overlay-text { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(108, 92, 231, 0.8); color: white; padding: 6px; font-size: 12px; }
        .btn-primary { background: linear-gradient(135deg, #6c5ce7, #8e44ad) !important; border-radius: 16px !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(108, 92, 231, 0.4) !important; }
      `}</style>
    </div>
  );
}

export default AddProduct;