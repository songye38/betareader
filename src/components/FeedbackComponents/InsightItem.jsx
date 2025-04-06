import React from 'react';

const InsightItem = ({ category, insight, count, selected = false, onClick }) => {
  const backgroundColor = selected ? '#35363F' : '#2C2D34';
  const hoverColor = '#3A3B42';
  const boxShadow = selected ? '0 0 0 1px white' : '0 0 0 1px #3A3D46';

  return (
    <div
      onClick={onClick}
      style={{
        background: backgroundColor,
        borderRadius: '8px',
        padding: '16px',
        boxShadow: boxShadow,
        color: 'white',
        fontFamily: 'Pretendard',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.background = hoverColor;
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.background = backgroundColor;
      }}
    >
      {/* 상단: 카테고리 뱃지 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            fontSize: 12,
            padding: '4px 8px',
            backgroundColor: '#444652',
            borderRadius: '4px',
            fontWeight: 600,
          }}
        >
          {category}
        </div>
      </div>

      {/* 인사이트 내용 */}
      <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {insight}
      </div>

      {/* 피드백 근거 정보 */}
      <div style={{ fontSize: 12, color: '#A0A0A0' }}>
        {count}개의 피드백에서 발견됨
      </div>
    </div>
  );
};

export default InsightItem;
