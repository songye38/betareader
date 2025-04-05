import React, { useState } from 'react';
import CharacterItem from './CharacterItem';
import EnvironmentItem from './EnvironmentItem';
import IdeaItem from './IdeaItem';

const dummyCharacters = Array.from({ length: 10 }, (_, i) => ({
  name: `캐릭터 ${i + 1}`,
  role: '주인공',
  ageCategory: '20대',
  age: '25',
  keywords: ['활발함', '긍정적'],
  appearance: '단발머리에 운동복',
  goal: '세계 평화',
}));

const dummyEnvironments = Array.from({ length: 8 }, (_, i) => ({
    title: `환경 ${i + 1}`,
    type: i % 2 === 0 ? '미래 도시' : '자연 보호구역', // 환경 종류 다양화
    description: i % 2 === 0
      ? `기술이 발전한 디스토피아. 도시 전체가 감시와 통제 아래 있으며, AI가 모든 것을 관리하고 있다. 시민들은 높은 기술력에 의존하며, 끊임없는 감시 속에서 살아간다.`
      : `자연과의 공존을 중시하는 지역. 기술보다는 자연과 생태계를 보호하는 것이 우선시되는 장소. 주민들은 친환경적 삶을 살고 있으며, 고대 자연과 현대 기술의 균형을 이룬 독특한 공동체가 형성되어 있다.`,
    references: [
      "https://www.daum.net",
      "https://www.nature.com",
      "https://www.sciencedaily.com/news/earth_environment/",
    ],
  }));

  const dummyIdeas = Array.from({ length: 12 }, (_, i) => ({
    title: `아이디어 ${i + 1}`,
    description: i % 2 === 0
      ? `인류는 이제 인공지능과 협력하여 새로운 에너지원 개발에 착수했다. 기존의 화석 연료는 거의 사라지고, 대신 태양광과 원자력 fusion을 이용한 새로운 전력망이 구축되었다. 이로 인해 국가 간의 에너지 전쟁은 종식되고, 전 세계는 평화로운 에너지 사회로 나아가고 있다.`
      : `우주는 인류의 새로운 삶의 터전이 되었다. 다양한 외계 생명체와의 첫 만남이 이루어진 후, 우주 식민지 건설이 급속히 진행된다. 인류는 다양한 행성에서 새로운 사회를 구성하며, 외계 종족과 협력하여 자원을 공유하고, 서로의 문화를 교류하는 시대가 열렸다.`,
    category: i % 2 === 0 ? '기술' : '우주',  // 카테고리 추가
    tags: i % 2 === 0 ? ['AI', '에너지', '태양광', '원자력'] : ['우주 식민지', '외계 생명체', '자원 공유', '문화 교류'], // 키워드 추가
  }));

const AllItemSet = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('character');

  const renderContent = () => {
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
    };

    if (activeTab === 'character') {
      return (
        <div style={gridStyle}>
          {dummyCharacters.map((char, idx) => (
            <CharacterItem key={idx} character={char} />
          ))}
        </div>
      );
    }
    if (activeTab === 'environment') {
      return (
        <div style={gridStyle}>
          {dummyEnvironments.map((env, idx) => (
            <EnvironmentItem key={idx} environment={env} />
          ))}
        </div>
      );
    }
    if (activeTab === 'idea') {
      return (
        <div style={gridStyle}>
          {dummyIdeas.map((idea, idx) => (
            <IdeaItem key={idx} idea={idea} />
          ))}
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'character', label: '캐릭터 카드' },
    { id: 'environment', label: '세계관 노트' },
    { id: 'idea', label: '아이디어' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isVisible ? 0 : '-100%',
        left: 0,
        right: 0,
        height: '100vh',
        backgroundColor: '#1F1F23', // 어두운 배경색
        color: '#FFFFFF',           // 밝은 텍스트
        transition: 'bottom 0.3s ease-in-out',
        zIndex: 2000,
        borderTop: '1px solid #333',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 상단 탭 + 닫기 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #3A3D46',
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: 14,
                borderBottom: activeTab === tab.id ? '3px solid white' : 'none',
                color: activeTab === tab.id ? '#FFFFFF' : '#979595',
                fontSize: 16,
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            fontSize: 28,
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding:'8px',
          }}
        >
          ✕
        </button>
      </div>

      {/* 콘텐츠 */}
      <div style={{ marginTop: 20, flex: 1, overflowY: 'auto' }}>{renderContent()}</div>
    </div>
  );
};

export default AllItemSet;
