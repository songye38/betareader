import React, { useState } from 'react';
import InsightItem from './InsightItem';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

const MAIN_PURPLE = '#8B5CF6';


const InsightSet = ({ round, insights = [], loading = false }) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  console.log('insights', insights);


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
      {insights.map((insight, index) => (
        <InsightItem
          key={index}
          category={insight.category}
          insight={insight.content}
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
