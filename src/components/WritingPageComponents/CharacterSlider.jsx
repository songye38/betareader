import React, { useEffect, useRef, useState } from 'react';
import CharacterItem from './CharacterItem';
import AddCharacterModal from '../Modal/AddCharacterModal';

const dummyCharacters = [
  {
    name: '이소연',
    role: '주인공',
    ageCategory: '20대 후반',
    age: '29',
    keywords: ['냉철함', '분석적', '이성적'],
    appearance: '긴 흑발에 날카로운 눈매\n평소 정장을 입고 다님',
    goal: '인공지능을 활용해 세상을 바꾸는 것',
  },
  {
    name: '박진수',
    role: '조력자',
    ageCategory: '30대 초반',
    age: '33',
    keywords: ['따뜻함', '유머러스', '친근함'],
    appearance: '단정한 헤어스타일에 캐주얼 복장',
    goal: '소연의 프로젝트를 실현시키는 것',
  },
  {
    name: '강하늘',
    role: '대립자',
    ageCategory: '40대',
    age: '45',
    keywords: ['야망', '완벽주의자', '냉정함'],
    appearance: '항상 슈트를 입고, 눈빛이 날카롭다',
    goal: '자신의 철학에 맞는 AI 세상을 구축',
  },
];

const CharacterSlider = ({ isVisible, onClose }) => {
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
      {/* 캐릭터 슬라이더: 팝업 안 열렸을 때만 보이게 */}
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
        {/* 헤더 + 추가 버튼 */}
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
          <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Pretendard' }}>캐릭터 카드</div>

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
            캐릭터 카드 추가하기
          </button>
        </div>

        {/* 캐릭터 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {dummyCharacters.map((char, index) => (
            <CharacterItem key={index} character={char} />
          ))}
        </div>
      </div>

      {/* 캐릭터 모달: 오버레이 */}
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
          <AddCharacterModal
            onClose={() => {
              setIsPopupOpen(false);
              onClose?.(); // 슬라이더까지 닫아줘!
            }}
          />
        </div>
      )}
    </>
  );
};


export default CharacterSlider;
