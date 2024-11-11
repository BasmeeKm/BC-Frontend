import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, probability, loading, formData, diagProbability, diagResult } = location.state || {};
  const [isResultVisible] = useState(!!result);
  const [isDiagVisible, setDiagVisible] = useState(false); // สถานะสำหรับแสดง diagResult

  const getDescription = (result) => {
    switch (result) {
      case 'เสี่ยงต่ำมาก':
        return "จากผลการทำนาย คุณมีความเสี่ยงในการเกิดโรคมะเร็งเต้านมในระดับน้อยมาก การดูแลสุขภาพอย่างสม่ำเสมอ เช่น การออกกำลังกายและรักษาน้ำหนักตัวให้อยู่ในเกณฑ์ที่เหมาะสม จะช่วยให้สุขภาพของคุณดีต่อไป";
      case 'เสี่ยงต่ำ':
        return "จากผลการทำนาย คุณมีความเสี่ยงในการเกิดโรคมะเร็งเต้านมในระดับน้อย ควรตรวจเช็คร่างกายเป็นประจำทุกปี และปฏิบัติตามคำแนะนำทางการแพทย์เพื่อรักษาสุขภาพอย่างต่อเนื่อง";
      case 'เสี่ยงปานกลาง':
        return "จากผลการทำนาย คุณมีความเสี่ยงปานกลางในการเกิดโรคมะเร็งเต้านม ควรพิจารณาตรวจคัดกรองเพิ่มเติม และปรึกษาแพทย์เพื่อรับคำแนะนำในการลดปัจจัยเสี่ยงต่างๆ";
      case 'เสี่ยงสูง':
        return "จากผลการทำนาย คุณมีความเสี่ยงสูงในการเกิดโรคมะเร็งเต้านม ควรเข้ารับการตรวจคัดกรองและปรึกษาแพทย์เพื่อรับคำแนะนำในการดูแลสุขภาพและป้องกันอย่างเหมาะสม";
      case 'เสี่ยงสูงมาก':
        return "จากผลการทำนาย คุณมีความเสี่ยงสูงมากในการเกิดโรคมะเร็งเต้านม ขอแนะนำให้คุณรีบเข้าพบแพทย์เพื่อรับการตรวจคัดกรองอย่างละเอียดและรับคำปรึกษาเพื่อป้องกันและจัดการความเสี่ยงต่อไป";
      case 'Positive':
        return "ผลตรวจพบการกลายพันธุ์ของยีน BRCA ซึ่งอาจเพิ่มความเสี่ยงต่อการเกิดมะเร็งเต้านมหรือมะเร็งรังไข่ได้ แนะนำให้คุณปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อรับคำปรึกษาเกี่ยวกับการตรวจติดตามและการป้องกันที่เหมาะสม เช่น การตรวจอย่างสม่ำเสมอและการพิจารณาทางเลือกในการดูแลสุขภาพเพิ่มเติม";
      case 'Negative':
        return "ผลตรวจไม่พบการกลายพันธุ์ของยีน BRCA อย่างไรก็ตาม ควรมีการตรวจสุขภาพและคัดกรองอย่างสม่ำเสมอ โดยเฉพาะหากคุณมีปัจจัยเสี่ยงอื่น ๆ เช่น ประวัติครอบครัวหรือสุขภาพส่วนบุคคล ควรปรึกษาแพทย์เพื่อขอคำแนะนำเพิ่มเติม";
      default:
        return "ไม่มีข้อมูลที่ชัดเจน โปรดติดต่อแพทย์เพื่อประเมินสถานการณ์ และรับคำแนะนำที่เหมาะสม";
    }
  };

  const ResultBox = ({ title, description, probability, noRiskProbability }) => (
    <div className="result-box">
      <div className="header">
        <button className="closebutton" onClick={() => window.history.back()}>X</button>
      </div>
      <div>
        <p className="result">{title}</p>
        <p className="description">{description}</p>
      </div>
      {probability !== undefined && (
        <div className="probabilities">
          <p className="probability-text">
            เปอร์เซ็นความเป็นไปได้: {probability.toFixed(2)}% <br />
            เปอร์เซ็นความไม่เป็นไปได้: {noRiskProbability.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );

  const noRiskProbability = probability !== undefined ? 100 - probability : undefined;
  const noRiskProbability2 = diagProbability !== undefined ? 100 - diagProbability : undefined;

  const handleDiagPrediction = () => {
    setDiagVisible(true);
  };

  return (
    <div className="result-container">
      {loading && (
        <div className="loading-popup">
          <div className="loading-message">
            กำลังประมวลผลด้วย AI กรุณารอสักครู่...
          </div>
        </div>
      )}

      {isResultVisible && !isDiagVisible && (
        <>
          <ResultBox
            title={result}
            description={getDescription(result)}
          />
          {probability !== undefined && (
            <div className="probabilities">
              <p className="probability-text">
                เปอร์เซ็นความเป็นไปได้: {probability.toFixed(2)}% <br />
                เปอร์เซ็นความไม่เป็นไปได้: {noRiskProbability.toFixed(2)}%
              </p>
            </div>
          )}
        </>
      )}

      {isDiagVisible && diagResult && (
        <>
          <ResultBox
            title={diagResult}
            description={getDescription(diagResult)}
          />
          {diagProbability !== undefined && (
            <div className="probabilities">
              <p className="probability-text">
                เปอร์เซ็นความเป็นไปได้: {diagProbability.toFixed(2)}% <br />
                เปอร์เซ็นความไม่เป็นไปได้: {noRiskProbability2.toFixed(2)}%
              </p>
            </div>
          )}
        </>
      )}

      <div className="button-rs">
        <button className="backrs-button" onClick={() => navigate('/')}>หน้าหลัก</button>

        {isDiagVisible || ['เสี่ยงต่ำมาก', 'เสี่ยงต่ำ', 'เสี่ยงปานกลาง', 'เสี่ยงสูง', 'เสี่ยงสูงมาก'].includes(result) ? ( // แสดงปุ่มลงทะเบียนคัดกรองเมื่อแสดงผล diag หรือผลความเสี่ยง
          <button className="homers-button" onClick={() => navigate('/Screening', {
            state: {
              weight: formData.weight,
              height: formData.height,
              province: formData.province,
              BRCA: formData.BRCA,
              BMI: (formData.weight / ((formData.height / 100) ** 2)).toFixed(2),
              result: result,
              probability: probability,
              diagResult: diagResult,
              diagProbability: diagProbability
            }
          })}>
            ลงทะเบียนคัดกรอง
          </button>
        ) : (
          ['Positive', 'Negative'].includes(result) && (
            <button className="homers-button" onClick={handleDiagPrediction}>
              ทำนายมะเร็งเต้านม
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Result;
