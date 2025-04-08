import React, { useState } from 'react';

const statusColors = {
  작성중: '#6071FB',
  '피드백 받는중': '#F27878',
};

const AllEpiItem = ({ episode, active,onClick }) => {
  const { title, content, lastUpdated, status } = episode;
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = active ? (statusColors[status] || '#999') : 'transparent';

  // 배경색 조건에 따라 다르게 적용
  const getBackgroundColor = () => {
    if (active) return '#3A3B42';
    if (isHovered) return '#383940';
    return '#2C2D34';
  };

  return (

    <div
      onClick={onClick} // ✅ 여기 클릭 이벤트 연결
      style={{
        background: getBackgroundColor(),
        padding: '24px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: 'white',
        boxShadow: active
          ? `0 0 0 2px ${borderColor}`
          : '0 2px 8px rgba(0,0,0,0.15)',
        fontFamily: 'Pretendard',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {content && (
        <div style={{ fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-line', color: '#CCCCCC' }}>
          {content.length > 120 ? content.slice(0, 120) + '...' : content}
        </div>
      )}

      {/* 최근 작성일 */}
      <div style={{ fontSize: '12px', color: '#888888', textAlign: 'right' }}>
        최근 작성일: {lastUpdated}
      </div>
    </div>
  );
};

export default AllEpiItem;
