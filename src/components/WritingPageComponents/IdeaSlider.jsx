import React from 'react';
import IdeaItem from './IdeaItem';

const mockIdeas = [
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
];

const IdeaSlider = ({ isVisible }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: isVisible ? 0 : '-420px',
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
      <div
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 20,
          fontFamily: 'Pretendard',
        }}
      >
        아이디어 모음
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {mockIdeas.map((idea, idx) => (
          <IdeaItem key={idx} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default IdeaSlider;
