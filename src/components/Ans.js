import React from 'react';
import { Link } from 'react-router-dom';
import './Ans.css';

function Ans() {
  return (
    <div className="ans-container">
      <div className="brca-container">
        <h1 className="title">ทราบผลตรวจยีน BRCA หรือไม่</h1>
        <p>(ยีน BRCA เป็นยีนที่เกี่ยวข้องกับการป้องกันมะเร็ง การกลายพันธุ์ของยีนนี้อาจเพิ่มความเสี่ยงในการเกิดมะเร็งเต้านม)</p>

      </div>
      <div className="buttonss-container">
        <Link to="/AssessmentForm" className="know">ทราบผล</Link>
        <Link to="/AssessmentForm2" className="unknow">ไม่ทราบผล</Link>
      </div>
    </div>
  );
}

export default Ans;