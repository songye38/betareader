import React from 'react';


//원고 추가 버튼






const ICONS = {
  ADD: '/plus_icon.svg',
  WRITE: '/write_icon.svg',
};

const TYPES = {
  PRIMARY: 'primary',
  NEUTRAL: 'neutral',
  WHITE: 'white',
};

const STATUSES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  DISABLED : 'disabled',
};



const Button1 = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        width: '12rem',
        padding: '0.5rem 1.25rem 0.5rem 1rem',
        justifyContent: 'center',  // 수평 중앙 정렬
        alignItems: 'center',      // 수직 중앙 정렬
        gap: '0.25rem',
        background: 'var(--neutral-800, #2C2D34)', // 배경색
        border: 'none',
        borderRadius: '0.75rem', // 모서리 둥글기
        cursor: 'pointer',
        color: 'white',
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '19.6px',
        wordWrap: 'break-word',
        position : 'absolute',
        bottom : '22px',
      }}
    >
      {/* SVG Icon */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="/plus_icon.svg" alt="Profile" width={24} height={24} />
      </div>

      {/* Text */}
      <span>원고지 추가</span>
    </button>
  );
};

export default Button1;
