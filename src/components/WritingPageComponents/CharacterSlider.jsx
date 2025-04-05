import React from 'react';
import CharacterItem from './CharacterItem';

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

const CharacterSlider = ({ isVisible }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: isVisible ? 0 : -420,
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
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
        캐릭터 카드
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {dummyCharacters.map((char, index) => (
          <CharacterItem key={index} character={char} />
        ))}
      </div>
    </div>
  );
};

export default CharacterSlider;
