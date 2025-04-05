import React from 'react';
import EnvironmentItem from './EnvironmentItem';

const EnvironmentSet = () => {
  const dummyEnvironment = {
    title: '네오서울',
    type: '디스토피아 도시',
    description: '첨단 기술과 감시사회가 공존하는 도시.\n권력은 AI가 장악하고 있다.',
    references: [
      'https://example.com/reference1',
      'https://example.com/urban-concept',
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <EnvironmentItem environment={dummyEnvironment} />
    </div>
  );
};

export default EnvironmentSet;
