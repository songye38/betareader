import React from 'react';

const statusColors = {
  작성중: '#4CAF50',       // 녹색
  '피드백 받는중': '#FF9800', // 주황색
};

const AllEpiItem = ({ episode }) => {
  const { title, content, lastUpdated, status } = episode;

  return (
    <div
      style={{
        background: '#2C2D34',
        padding: '24px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 상단: 제목 + 상태 뱃지 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h3>
        <span
          style={{
            backgroundColor: statusColors[status] || '#999',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '700',
          }}
        >
          {status}
        </span>
      </div>

      {/* 본문 요약 */}
      <div style={{ fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-line', color: '#CCCCCC' }}>
        {content.length > 120 ? content.slice(0, 120) + '...' : content}
      </div>

      {/* 최근 작성일 */}
      <div style={{ fontSize: '12px', color: '#888888', textAlign: 'right' }}>
        최근 작성일: {lastUpdated}
      </div>
    </div>
  );
};

export default AllEpiItem;
