import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  return (
    <div className="app-container">
      <header className="header-container">
        <div className="header-content">
          <img src="xx.png" alt="Logo" className="header-logo" />
          <p className="header-title">ยืนยันการลงทะเบียนคัดกรองมะเร็งเต้านม</p>
        </div>
      </header>

      <main className="confirmation-container">
        <FaCheckCircle className="confirmation-icon" />
        <h2 className="confirmation-title">ลงทะเบียนสำเร็จ</h2>
        <p className="confirmation-message">
          ขอบคุณที่ลงทะเบียนเพื่อรับการคัดกรองมะเร็งเต้านม
          เจ้าหน้าที่จะติดต่อกลับไปที่หมายเลขโทรศัพท์ที่ท่านให้ไว้เพื่อนัดหมายวันเวลาในการคัดกรอง
        </p>
        <div className="confirmation-details">
          <p><strong>ชื่อ-นามสกุล:</strong> {formData?.fullName}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> {formData?.phoneNumber}</p>
        </div>
        <button className="home-button" onClick={() => navigate('/')}>กลับสู่หน้าหลัก</button>
      </main>
    </div>
  );
};

export default Confirmation;