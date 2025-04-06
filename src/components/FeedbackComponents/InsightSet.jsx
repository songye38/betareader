import React, { useState } from 'react';
import InsightItem from './InsightItem';

const mockInsights = [
  {
    category: '서사 흐름',
    insight: '스토리 중반부에서 인물의 동기 설명이 부족하다는 의견이 많았어요. 갈등 전개 전에 배경 설명을 보강해보세요.',
    count: 6,
  },
  {
    category: '문장 표현',
    insight: '일부 문장에서 같은 단어의 반복 사용이 많다는 피드백이 있었어요. 유사한 표현으로 다양성을 주는 걸 추천해요.',
    count: 4,
  },
  {
    category: '감정 몰입',
    insight: '클라이맥스 장면에서 주인공의 감정 변화가 급격하다는 의견이 있었어요. 더 부드러운 전환을 고려해보세요.',
    count: 5,
  },
];

const InsightSet = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelect = (index) => {
    setSelectedIndexes((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index) // 선택 해제
        : [...prevSelected, index] // 선택 추가
    );
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        backgroundColor: '#1F1F24',
        borderRadius: '12px',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          fontFamily: 'Pretendard',
          marginBottom: '8px',
        }}
      >
        인사이트 요약
      </div>

      {mockInsights.map((insight, index) => (
        <InsightItem
          key={index}
          category={insight.category}
          insight={insight.insight}
          count={insight.count}
          selected={selectedIndexes.includes(index)}
          onClick={() => toggleSelect(index)}
        />
      ))}
    </div>
  );
};

export default InsightSet;
