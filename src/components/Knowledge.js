import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Knowledge.css';

function Knowledge() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      id: 'section1',
      title: 'มะเร็งเต้านม คืออะไร',
      content: 'มะเร็งเต้านมเป็นมะเร็งที่พบบ่อยที่สุดในผู้หญิง เกิดจากการเจริญเติบโตผิดปกติของเซลล์ในเนื้อเยื่อเต้านม ซึ่งอาจลุกลามไปยังอวัยวะอื่นได้หากไม่ได้รับการรักษาทันท่วงที'
    },
    {
      id: 'section2',
      title: 'อาการ',
      list: [
        'คลำพบก้อนที่เต้านมหรือรักแร้',
        'ผิวหนังเต้านมหนาตัวขึ้นหรือบวมแดง',
        'หัวนมบุ๋มหรือมีสารคัดหลั่งออกมา',
        'เต้านมมีขนาดหรือรูปร่างเปลี่ยนแปลง'
      ]
    },
    {
      id: 'section3',
      title: 'ปัจจัยเสี่ยง',
      list: [
        'อายุมากกว่า 50 ปี',
        'มีประวัติครอบครัวเป็นมะเร็งเต้านม',
        'เริ่มมีประจำเดือนเร็วหรือหมดประจำเดือนช้า',
        'ไม่เคยมีบุตรหรือมีบุตรคนแรกเมื่ออายุมาก',
        'ดื่มแอลกอฮอล์หรือสูบบุหรี่'
      ]
    },
    {
      id: 'section4',
      title: 'การคัดกรองด้วยตนเอง',
      image: 'bc.png'
    },
    {
      id: 'section5',
      title: 'การรักษา',
      list: [
        'การผ่าตัด',
        'เคมีบำบัด',
        'รังสีรักษา',
        'ฮอร์โมนบำบัด',
        'การรักษาแบบมุ่งเป้า'
      ]
    },
    {
      id: 'section6',
      title: 'ทำความรู้จักกับ BRCA',
      content: 'BRCA1 และ BRCA2 เป็นยีนที่เกี่ยวข้องกับการป้องกันมะเร็ง การกลายพันธุ์ของยีนนี้อาจเพิ่มความเสี่ยงในการเกิดมะเร็งเต้านมและรังไข่'
    }
  ];

  return (
    <div className="knowledge-container">
      <header className="header-container">
        <div className="header-content">
          <img src="xx.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">ระบบประเมินความเสี่ยงโรคมะเร็งเต้านมด้วยตนเอง</h1>
        </div>
      </header>

      <section className="intro-section">
        <h2>รู้หรือไม่?</h2>
        <ul className="facts-list">
          <li>มะเร็งเต้านม เป็นมะเร็งที่พบบ่อยมาก</li>
          <li>เป็นอันดับ 1 ของมะเร็งในผู้หญิงทั่วโลก</li>
          <li>มีแนวโน้มพบสูงขึ้นอย่างต่อเนื่อง</li>
          <li>ผู้ชายก็มีโอกาสเป็นมะเร็งเต้านมได้</li>
          <li>ผู้ป่วยหญิงรายใหม่วันละ 49 คน</li>
          <li>ผู้ป่วยเสียชีวิตวันละ 13 คน</li>
        </ul>
      </section>

      <section className="button-section">
        <img src="/ccribbon.png" alt="Breast Cancer Ribbon" className="ribbon-image" />
        <div className="buttons-container">
          {sections.map((section) => (
            <button
              key={section.id}
              className="menu-button"
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </button>
          ))}
            <button className="special-button"
              onClick={() => navigate('/Ans')}
            >
              แบบประเมินตนเอง
            </button>
        </div>
      </section>

      <div className="section-container">
        {sections.map((section) => (
          <div key={section.id} className="section-wrapper fade-in-section">
            
            <div className="content-section">
            <h2 className="section-title" id={section.id}>{section.title}</h2>
              {section.content && <p>{section.content}</p>}
              {section.list && (
                <ul className="facts-list">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
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

export default Knowledge;