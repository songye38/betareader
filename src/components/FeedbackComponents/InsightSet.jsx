import React, { useState } from 'react';
import InsightItem from './InsightItem';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

const MAIN_PURPLE = '#8B5CF6';

const mockInsights = [
  {
    category: '서사 흐름',
    insight:
      '스토리 중반부에서 인물의 동기 설명이 부족하다는 의견이 많았어요. 갈등 전개 전에 배경 설명을 보강해보세요.',
    count: 6,
  },
  {
    category: '문장 표현',
    insight:
      '일부 문장에서 같은 단어의 반복 사용이 많다는 피드백이 있었어요. 유사한 표현으로 다양성을 주는 걸 추천해요.',
    count: 4,
  },
  {
    category: '감정 몰입',
    insight:
      '클라이맥스 장면에서 주인공의 감정 변화가 급격하다는 의견이 있었어요. 더 부드러운 전환을 고려해보세요.',
    count: 5,
  },
];

const InsightSet = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelect = (index) => {
    setSelectedIndexes((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* 섹션 제목 */}
      <div
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          fontFamily: 'Pretendard',
        }}
      >
        BetaFocus
      </div>

      {/* 설명 박스 */}
      <div
        style={{
          backgroundColor: '#2A2B2F',
          padding: '12px 16px',
          borderRadius: '8px',
          color: '#eee',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          className={poppins.className}
          style={{
            color: MAIN_PURPLE,
            fontSize: '14px',
            fontWeight: '700',
            lineHeight: '24px',
          }}
        >
          ✨ BetaFocus란?
        </div>
        <div style={{ color: '#ccc' }}>
          피드백 속 핵심 인사이트에 집중하고, 더 나은 글을 완성하세요.
        </div>
      </div>

      {/* 인사이트 리스트 */}
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

      {/* 하단 버튼 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <button
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: MAIN_PURPLE,
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#7C4DFF')}
          onMouseOut={(e) => (e.target.style.backgroundColor = MAIN_PURPLE)}
          onClick={() => {
            alert('전체 재작성 기능 실행!');
          }}
        >
          전체 재작성하기
        </button>

        <button
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: '#3A3B42',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            alert(`선택된 인사이트: ${selectedIndexes.length}개`);
          }}
        >
          수정이 필요한 부분 보기
        </button>
      </div>
    </div>
  );
};

export default InsightSet;
