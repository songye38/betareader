import React from 'react';

const EpisodeTab = ({ label = '설정집', selected = false, onClick }) => {
  return (
    <div
      onClick={onClick} // 클릭 이벤트를 처리
      style={{
        display: 'flex',
        width: '13.75rem',
        borderRadius: '0.75rem',
        height: '2.25rem',
        padding: '0.5rem 0.8125rem',
        alignItems: 'center',
        gap: '0.625rem',
        background: selected
          ? 'var(--neutral-700, #3A3D46)' // 선택된 탭의 배경색
          : 'var(--neutral-800, #1E1F24)', // 기본 배경색
        cursor: 'pointer',
      }}
    >
      {/* 텍스트 */}
      <div
        style={{
          color: 'white',
          fontSize: '14px',
          fontFamily: 'Pretendard',
          fontWeight: '500',
          lineHeight: '19.6px',
          wordWrap: 'break-word',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default EpisodeTab;
