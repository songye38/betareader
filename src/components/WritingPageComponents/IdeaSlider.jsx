import React, { useEffect, useRef, useState } from 'react';
import IdeaItem from './IdeaItem';
import AddIdeaModal from '../Modal/AddIdeaModal';

const IdeaSlider = ({ isVisible, onClose }) => {
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ideas, setIdeas] = useState([
    {
      title: 'AI 반려동물 프로젝트',
      category: '테크',
      description: 'AI가 주인의 감정을 분석해서 반응하는 반려동물 개발\n실제 행동도 가능하게!',
      tags: ['AI', '감정인식', '로봇'],
    },
    {
      title: '해저 도시 구축',
      category: 'SF',
      description: '지구 온난화 대안으로 바닷속 도시 건설\n수중 생태계와 공존하는 사회',
      tags: ['미래도시', '기후위기'],
    },
    {
      title: '마법 학교의 혁명',
      category: '판타지',
      description: '기존 마법 질서를 깨는 하급 마법사의 혁명 이야기',
      tags: ['혁명', '마법', '학교'],
    },
    {
      title: '우주 해적단',
      category: 'SF',
      description: '은하계를 누비는 무법자들의 전설',
      tags: ['우주', '모험', '해적'],
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && sliderRef.current && !sliderRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  const handleAddIdea = (newIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* 아이디어 리스트 슬라이더 */}
      <div
        ref={sliderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: isVisible && !isPopupOpen ? 0 : '-420px',
          height: '100vh',
          width: '400px',
          background: '#1F1F24',
          transition: 'left 0.3s ease-in-out',
          boxShadow: '2px 0 6px rgba(0,0,0,0.4)',
          padding: 20,
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: '1px solid #3A3D46',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
              color: '#FFFFFF',
            }}
          >
            아이디어 모음
          </div>

          <button
            onClick={() => setIsPopupOpen(true)}
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
          >
            아이디어 추가하기
          </button>
        </div>

        {/* 아이디어 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {ideas.map((idea, idx) => (
            <IdeaItem key={idx} idea={idea} />
          ))}
        </div>
      </div>

      {/* 아이디어 추가 슬라이드 */}
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '400px',
            zIndex: 1001,
            transition: 'transform 0.3s ease-in-out',
            backgroundColor: '#2C2D34',
            boxShadow: '2px 0 6px rgba(0,0,0,0.4)',
          }}
        >
          <AddIdeaModal
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleAddIdea}
          />
        </div>
      )}
    </>
  );
};

export default IdeaSlider;
