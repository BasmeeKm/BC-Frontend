import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaIdCard, FaPhone, FaCalendarAlt, FaWeight, FaRulerVertical, FaMapMarkerAlt, FaDna } from 'react-icons/fa';
import './Screening.css';

const Screening = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    fullName = '',
    idCard = '',
    phoneNumber = '',
    birthDate = '',
    address = '',
    province = '',
    weight,
    height,
    BRCA,
    BMI,
    result,
    probability,
    diagResult,
    diagProbability

  } = location.state || {};

  const [formData, setFormData] = useState({
    fullName,
    idCard,
    phoneNumber,
    birthDate,
    address,
    province,
    weight: weight || '',
    height: height || '',
    BMI: BMI || '',
    BRCA: BRCA || '',
    result: result || '',
    probability: probability || '',
    diagResult: diagResult || '',
    diagProbability: diagProbability || '',
    consent: true
  });

  const [age, setAge] = useState({ years: 0, months: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'idCard', 'phoneNumber', 'birthDate', 'address'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError('กรุณากรอกข้อมูลให้ครบ');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPopup(true);
    }
  };

  const handleConfirm = async () => {
    setShowPopup(false);
    setLoading(true);

    const screeningData = {
      ...formData
    };

    try {
      const response = await fetch('http://localhost:8000/screening/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(screeningData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${errorResponse.detail || 'Unknown error'}`);
      }

      navigate('/confirmation', { state: { formData: screeningData } });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
    setLoading(false);

  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return { years: 0, months: 0 };

    const birth = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  useEffect(() => {
    const newAge = calculateAge(formData.birthDate);
    setAge(newAge);
  }, [formData.birthDate]);

  return (
    <div className="app-container">
      <div className="header">
        <button className="close-button" onClick={() => navigate('/')}>X</button>
      </div>
      <header className="header-container">
        <div className="header-content">
          <img src="xx.png" alt="Logo" className="header-logo" />
          <p className="header-title">ลงทะเบียนคัดกรองมะเร็งเต้านม</p>
        </div>
      </header>

      <main className="form-container">
        <p className="app-title">กรอกข้อมูลส่วนตัว</p>

        <form onSubmit={handleSubmit} className="screening-form">
          <div className="form-group">
            <label htmlFor="fullName"><FaUser /> ชื่อ-นามสกุล:</label>
            <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="idCard"><FaIdCard /> เลขบัตรประชาชน:</label>
            <input type="text" id="idCard" value={formData.idCard} onChange={handleChange} required pattern="\d{13}" title="กรุณากรอกเลขบัตรประชาชน 13 หลัก" />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber"><FaPhone /> เบอร์โทรศัพท์:</label>
            <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required pattern="\d{10}" title="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก" />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate"><FaCalendarAlt /> วันเกิด:</label>
            <input type="date" id="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>อายุ (ปี):</label>
            <input type="text" value={`${age.years}`} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="address"><FaMapMarkerAlt /> ที่อยู่:</label>
            <input type="text" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="province"><FaMapMarkerAlt /> จังหวัด:</label>
            <input type="text" id="province" value={formData.province} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="weight"><FaWeight /> น้ำหนัก (กก.):</label>
            <input type="number" id="weight" value={formData.weight} onChange={handleChange} readOnly min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="height"><FaRulerVertical /> ส่วนสูง (ซม.):</label>
            <input type="number" id="height" value={formData.height} onChange={handleChange} readOnly min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="BMI"><FaWeight /> BMI:</label>
            <input type="number" id="BMI" value={formData.BMI} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="BRCA"><FaDna /> BRCA:</label>
            <input type="text" id="BRCA" value={formData.BRCA} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="result">ระดับความเสี่ยง:</label>
            <input type="text" id="result" value={formData.diagResult || formData.result} onChange={handleChange} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="probability">เปอร์เซ็นต์ความเสี่ยง:</label>
            <input type="text" id="probability" value={formData.diagProbability || formData.probability} onChange={handleChange} readOnly />
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="container">
          <button type="button" className="submit-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'กำลังบันทึก...' : 'ส่งข้อมูล'}
          </button>
        </div>
      </main>

      {showPopup && (
        <div className="consent-popup">
          <div className="popup-content">
            <p>คุณต้องการส่งข้อมูลนี้หรือไม่?</p>
            <button onClick={handleConfirm} className="consent-button">ยืนยัน</button>
            <button onClick={handleCancel} className="consent-button">ยกเลิก</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screening;
