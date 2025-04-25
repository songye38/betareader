import React, { useState, useEffect } from 'react';
import CharacterItem from './CharacterItem';
import EnvironmentItem from './EnvironmentItem';
import IdeaItem from './IdeaItem';
import { useRouter } from 'next/router';
import useCharacter from '@/hooks/useCharacter';
import useEnvironment from '@/hooks/useEnvironment';
import useIdea from '@/hooks/useIdea';

const AllItemSet = ({ isVisible, onClose }) => {
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const [activeTab, setActiveTab] = useState('character');
  const { fetchCharacters, characters, deleteCharacter } = useCharacter();
  const { environments, fetchEnvironments, deleteEnvironment } = useEnvironment();
  const { ideas, fetchIdeas, deleteIdea } = useIdea();


  useEffect(() => {
    if (!manuscriptId) return;
    fetchCharacters(manuscriptId); // 내부에서 loading 및 ideas 처리됨
    fetchEnvironments(manuscriptId);
    fetchIdeas(manuscriptId);
  }, [isVisible]);


  const renderContent = () => {
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
    };

    if (activeTab === 'character') {
      return (
        <div style={gridStyle}>
          {characters.map((char, idx) => (
            <CharacterItem key={idx} character={char} onDelete={deleteCharacter} />
          ))}
        </div>
      );
    }
    if (activeTab === 'environment') {
      return (
        <div style={gridStyle}>
          {environments.map((env, idx) => (
            <EnvironmentItem key={idx} environment={env} onDelete={deleteEnvironment} />
          ))}
        </div>
      );
    }
    if (activeTab === 'idea') {
      return (
        <div style={gridStyle}>
          {ideas.map((idea, idx) => (
            <IdeaItem key={idx} idea={idea} onDelete={deleteIdea} />
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
            padding: '8px',
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
