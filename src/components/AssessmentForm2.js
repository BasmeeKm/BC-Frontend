import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssessmentForm.css';
import { FaWeight, FaRulerVertical, FaCalendarWeek, FaMapMarkerAlt } from 'react-icons/fa';

function AssessmentForm2() {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    province: '',
  });

  const [loading, setLoading] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.age) < 25) {
      setErrorMessage('ระบบนี้สามารถใช้ได้กับบุคคลที่มีอายุ 25 ปีขึ้นไปเท่านั้น');
      return;
    }

    setShowConsentPopup(true);
  };

  const handleConsent = async (isConsent) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FORM_TYPE: 'form2',
          BMI_GROUP: { weight: parseFloat(formData.weight), height: parseFloat(formData.height) },
          AGE_GROUP: parseInt(formData.age),
          PROVINCE_GROUP: [formData.province],
          consent: isConsent,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');


      const resultData = await response.json();
      console.log('Prediction BRCA:', resultData.prediction_brca);
      console.log('Probability BRCA:', resultData.probability_brca);
      console.log('Prediction DIAG:', resultData.prediction_diag);
      console.log('Probability DIAG:', resultData.probability_diag);

      navigate('/result', {
        state: {
          result: resultData.prediction_brca,
          probability: resultData.probability_brca,

          diagResult: resultData.prediction_diag,
          diagProbability: resultData.probability_diag,

          formData: { ...formData, BRCA: resultData.prediction_brca },
          consent: isConsent,
          loading: false
        }
      });
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(`เกิดข้อผิดพลาด: ${error.response.data.detail}`);
      } else {
        setErrorMessage('กรุณาตรวจสอบการกรอกข้อมูลให้ถูกต้อง');
      }
    } finally {
      setLoading(false);
      setShowConsentPopup(false);
    }
  };


  return (
    <div className="app-container">
      <div className="header">
        <button className="close-button" onClick={() => window.history.back()}>X</button>
      </div>
      <header className="header-container">
        <div className="header-content">
          <img src="xx.png" alt="Logo" className="header-logo" />
          <p className="header-title">ระบบประเมินผลยีน BRCA ด้วยตนเอง</p>
        </div>
      </header>

      <main className="form-container">
        <p className="app-title">กรอกข้อมูลส่วนตัว</p>

        <form className="assessment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="weight"><FaWeight /> น้ำหนัก (กก.):</label>
            <input type="number" id="weight" value={formData.weight} onChange={handleChange} placeholder="กรอกน้ำหนัก" required />
          </div>
          <div className="form-group">
            <label htmlFor="height"><FaRulerVertical /> ส่วนสูง (ซม.):</label>
            <input type="number" id="height" value={formData.height} onChange={handleChange} placeholder="กรอกส่วนสูง" required />
          </div>
          <div className="form-group">
            <label htmlFor="age"><FaCalendarWeek /> อายุ (ปี):</label>
            <input type="number" id="age" value={formData.age} onChange={handleChange} placeholder="กรอกอายุ" required />
          </div>
          <div className="form-group">
            <label htmlFor="province"><FaMapMarkerAlt /> จังหวัด:</label>
            <select id="province" value={formData.province} onChange={handleChange} required>
              <option value="" disabled>เลือกจังหวัด</option>
              <option value="Bangkok">กรุงเทพมหานคร</option>
              <option value="Samut Prakan">สมุทรปราการ</option>
              <option value="Nonthaburi">นนทบุรี</option>
              <option value="Pathum Thani">ปทุมธานี</option>
              <option value="Ayutthaya">พระนครศรีอยุธยา</option>
              <option value="Ang Thong">อ่างทอง</option>
              <option value="Lopburi">ลพบุรี</option>
              <option value="Sing Buri">สิงห์บุรี</option>
              <option value="Chai Nat">ชัยนาท</option>
              <option value="Saraburi">สระบุรี</option>
              <option value="Chonburi">ชลบุรี</option>
              <option value="Rayong">ระยอง</option>
              <option value="Chanthaburi">จันทบุรี</option>
              <option value="Trat">ตราด</option>
              <option value="Chachoengsao">ฉะเชิงเทรา</option>
              <option value="Prachin Buri">ปราจีนบุรี</option>
              <option value="Nakhon Nayok">นครนายก</option>
              <option value="Sa Kaeo">สระแก้ว</option>
              <option value="Nakhon Ratchasima">นครราชสีมา</option>
              <option value="Buri Ram">บุรีรัมย์</option>
              <option value="Surin">สุรินทร์</option>
              <option value="Si Sa Ket">ศรีสะเกษ</option>
              <option value="Ubon Ratchathani">อุบลราชธานี</option>
              <option value="Yasothon">ยโสธร</option>
              <option value="Chaiyaphum">ชัยภูมิ</option>
              <option value="Amnat Charoen">อำนาจเจริญ</option>
              <option value="Bueng Kan">บึงกาฬ</option>
              <option value="Nong Bua Lamphu">หนองบัวลำภู</option>
              <option value="Khon Kaen">ขอนแก่น</option>
              <option value="Udon Thani">อุดรธานี</option>
              <option value="Loei">เลย</option>
              <option value="Nong Khai">หนองคาย</option>
              <option value="Maha Sarakham">มหาสารคาม</option>
              <option value="Roi Et">ร้อยเอ็ด</option>
              <option value="Kalasin">กาฬสินธุ์</option>
              <option value="Sakon Nakhon">สกลนคร</option>
              <option value="Nakhon Phanom">นครพนม</option>
              <option value="Mukdahan">มุกดาหาร</option>
              <option value="Chiang Mai">เชียงใหม่</option>
              <option value="Lamphun">ลำพูน</option>
              <option value="Lampang">ลำปาง</option>
              <option value="Uttaradit">อุตรดิตถ์</option>
              <option value="Phrae">แพร่</option>
              <option value="Nan">น่าน</option>
              <option value="Phayao">พะเยา</option>
              <option value="Chiang Rai">เชียงราย</option>
              <option value="Mae Hong Son">แม่ฮ่องสอน</option>
              <option value="Nakhon Sawan">นครสวรรค์</option>
              <option value="Uthai Thani">อุทัยธานี</option>
              <option value="Kamphaeng Phet">กำแพงเพชร</option>
              <option value="Tak">ตาก</option>
              <option value="Sukhothai">สุโขทัย</option>
              <option value="Phitsanulok">พิษณุโลก</option>
              <option value="Phichit">พิจิตร</option>
              <option value="Phetchabun">เพชรบูรณ์</option>
              <option value="Ratchaburi">ราชบุรี</option>
              <option value="Kanchanaburi">กาญจนบุรี</option>
              <option value="Suphan Buri">สุพรรณบุรี</option>
              <option value="Nakhon Pathom">นครปฐม</option>
              <option value="Samut Sakhon">สมุทรสาคร</option>
              <option value="Samut Songkhram">สมุทรสงคราม</option>
              <option value="Phetchaburi">เพชรบุรี</option>
              <option value="Prachuap Khiri Khan">ประจวบคีรีขันธ์</option>
              <option value="Nakhon Si Thammarat">นครศรีธรรมราช</option>
              <option value="Krabi">กระบี่</option>
              <option value="Phang Nga">พังงา</option>
              <option value="Phuket">ภูเก็ต</option>
              <option value="Surat Thani">สุราษฎร์ธานี</option>
              <option value="Ranong">ระนอง</option>
              <option value="Chumphon">ชุมพร</option>
              <option value="Songkhla">สงขลา</option>
              <option value="Satun">สตูล</option>
              <option value="Trang">ตรัง</option>
              <option value="Phatthalung">พัทลุง</option>
              <option value="Pattani">ปัตตานี</option>
              <option value="Yala">ยะลา</option>
              <option value="Narathiwat">นราธิวาส</option>
            </select>
          </div>
        </form>

        <div className="container">
          <button type="button" className="submit-button" onClick={handleSubmit}>ทำนายผล</button>
        </div>

        {/* แสดงข้อความแสดงข้อผิดพลาด */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {/* Consent Popup */}
        {showConsentPopup && (
          <div className="consent-popup">
            <div className="popup-content">
              <p>ยินยอมให้นำข้อมูลไปใช้ในการพัฒนาโมเดลต่อไป (ข้อมูลจะถูกเก็บเป็นความลับ)</p>
              <button onClick={() => handleConsent(true)} className="consent-button">ยินยอม</button>
              <button onClick={() => handleConsent(false)} className="consent-button">ไม่ยินยอม</button>
            </div>
          </div>
        )}

        {/* Loading popup */}
        {loading && (
          <div className="loading-popup">
            <div className="loading-message">
              กำลังประมวลผลด้วย AI กรุณารอสักครู่...
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AssessmentForm2;
