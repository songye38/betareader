import React from 'react';
import EnvironmentItem from './EnvironmentItem';

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
    description: '지구 밖에서 새로운 문명을 건설 중인 인간들의 거주지.\n중력이 낮고, 인공 생태계가 존재한다.',
    references: ['https://space.org/ref1', 'https://nasa.gov/concept'],
  },
];

const EnvironmentSlider = ({ isVisible }) => {
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
        세계관 노트
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {dummyEnvironments.map((env, index) => (
          <EnvironmentItem key={index} environment={env} />
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSlider;
