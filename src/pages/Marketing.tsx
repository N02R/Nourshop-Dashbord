import React, { useState } from 'react';

// 1. تعريف الأنواع المسموحة للجمهور (Literal Types)
type AudienceType = "الشباب (18-35)" | "رجال الأعمال" | "الطلاب";

// 2. واجهة خيارات المنتجات (اختياري لجعل الكود أنظف)
interface ProductOption {
  id: string;
  name: string;
}

function Marketing() {
  // استخدام النوع المحدد للحالة
  const [targetAudience, setTargetAudience] = useState<AudienceType>("الشباب (18-35)");
  
  const products: ProductOption[] = [
    { id: 'p1', name: 'iPhone 15 Pro' },
    { id: 'p2', name: 'MacBook Air M2' },
    { id: 'p3', name: 'AirPods Pro' },
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">التسويق الذكي (AI Marketing)</h2>
        <button className="btn btn-primary shadow-sm">+ حملة جديدة</button>
      </div>

      <div className="row g-4">
        {/* محرك توليد الإعلانات */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">🚀 منشئ الحملات المدعوم بالـ AI</h5>
            <div className="mb-3">
              <label className="form-label small text-muted">اختر المنتج المراد ترويجه</label>
              <select className="form-select bg-light border-0 py-2">
                {products.map(product => (
                  <option key={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label small text-muted">النص الإعلاني المقترح من AI</label>
              <div className="p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-10">
                <p className="mb-0 fw-bold text-primary">
                  "ارتقِ بتجربتك مع المنتج الجديد. أداء لا مثيل له، تصميم مذهل، ومتوفر الآن حصرياً في Nourshope!"
                </p>
              </div>
            </div>

            <button className="btn btn-primary w-100 py-2 fw-bold mt-auto">نشر الحملة الآن</button>
          </div>
        </div>

        {/* مؤشرات الأداء المتوقع */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">🎯 الجمهور المستهدف</h5>
            <select 
              className="form-select bg-light border-0 mb-3" 
              // تحديد نوع القيمة القادمة من الاختيار
              onChange={(e) => setTargetAudience(e.target.value as AudienceType)}
            >
              <option value="الشباب (18-35)">الشباب (18-35)</option>
              <option value="رجال الأعمال">رجال الأعمال</option>
              <option value="الطلاب">الطلاب</option>
            </select>
            <div className="p-3 bg-success bg-opacity-10 rounded-3 text-center">
              <p className="small text-muted mb-1">نسبة النجاح المتوقعة</p>
              <h3 className="fw-bold text-success mb-0">87%</h3>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4 text-white" style={{ background: 'linear-gradient(45deg, #1a1a1a, #333)' }}>
            <h6 className="small opacity-75">ميزانية التسويق المقترحة</h6>
            <h3 className="fw-bold">$500.00</h3>
            <hr className="opacity-25" />
            <p className="small mb-0">
              💡 نصيحة AI: "استهداف <span className="text-info fw-bold">{targetAudience}</span> في هذا الوقت من الأسبوع سيزيد المبيعات بنسبة 12%".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketing;