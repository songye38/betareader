import React, { useEffect, useRef, useState } from 'react';
import EnvironmentItem from './EnvironmentItem';
import AddEnvironmentModal from '../Modal/AddEnvironmentModal';

const dummyEnvironments = [
  {
    title: '네오서울',
    type: '디스토피아 도시',
    description: '첨단 기술과 감시사회가 공존하는 도시.\n권력은 AI가 장악하고 있다.',
    references: [
      'https://example.com/reference1',
      'https://example.com/urban-concept',
    ],
  },
  {
    title: '에코빌리지',
    type: '자연친화 커뮤니티',
    description: '자급자족하며 살아가는 생태 마을.\n기술보다 공동체의 가치를 중요시한다.',
    references: ['https://example.com/eco'],
  },
  {
    title: '루미나 스페이스',
    type: '우주 식민지',
    description:
      '대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다.',
    references: ['https://space.org/ref1', 'https://nasa.gov/concept'],
  },
];

const EnvironmentSlider = ({ isVisible, onClose }) => {
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && !isPopupOpen && sliderRef.current && !sliderRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose, isPopupOpen]);

  return (
    <>
      <div
        ref={sliderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: isVisible && !isPopupOpen ? 0 : -420,
          width: 400,
          height: '100vh',
          backgroundColor: '#1F1F23',
          color: 'white',
          padding: 20,
          overflowY: 'auto',
          boxShadow: '4px 0px 10px rgba(0,0,0,0.2)',
          borderRight: '1px solid #3A3D46',
          transition: 'left 0.3s ease-in-out',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 헤더 + 버튼 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            marginBottom: 20,
            borderBottom: '1px solid #3A3D46',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
            }}
          >
            세계관 노트
          </div>

          <button
            style={{
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 500,
              color: '#FFFFFF',
              backgroundColor: '#2C2D34',
              border: '1px solid #3A3D46',
              borderRadius: 6,
              fontFamily: 'Pretendard',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onClick={() => setIsPopupOpen(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
          >
            세계관 노트 추가하기
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {dummyEnvironments.map((env, index) => (
            <EnvironmentItem key={index} environment={env} />
          ))}
        </div>
      </div>

      {/* AddEnvironmentModal */}
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1001,
            backgroundColor: '#2C2D34',
            width: 400,
            height: '100vh',
          }}
        >
          <AddEnvironmentModal
            onClose={() => {
              setIsPopupOpen(false);
              onClose?.(); // 슬라이더도 함께 닫히게!
            }}
          />
        </div>
      )}
    </>
  );
};

export default EnvironmentSlider;
