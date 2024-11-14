import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    { id: 'section1', title: 'Model Performance', image: 'ModelPerfomance.png' },
    { id: 'section2', title: 'ที่มาและความสำคัญ', image: '02.png' },
    { id: 'section3', title: 'ภาพรวมข้อมูลผู้ป่วย', image: 'Dummy.png' },
  ];

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src="/ccribbon.png" alt="Breast Cancer Awareness" className="logo" />
        <h1 className="title">SMART Breast Risk<br/>ระบบ AI ประเมินความเสี่ยงมะเร็งเต้านมด้วยตนเอง</h1>
      </div>

      <section className="button-section">
        <div className="button-container">
          <button className="primary-button" onClick={() => navigate('/Ans')}>
            แบบประเมินตนเอง
          </button>
          <button className="secondary-button" onClick={() => navigate('/Knowledge')}>
            เกี่ยวกับมะเร็งเต้านม
          </button>
        </div>
      </section>

      <div className="section-container">
        {sections.map((section) => (
          <div key={section.id} className="section-wrapper fade-in-section">
            <div className="content-section">
              <h2 className="section-title" id={section.id}>{section.title}</h2>
              {section.image && (
                <img src={section.image} alt={section.title} className="section-image" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;