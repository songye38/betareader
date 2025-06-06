'use client';

import React from 'react';

const SaveEpiBtn = ({ disabled, onClick }) => {
  const baseColor = '#A78EF7';
  const disabledColor = '#D1C4F7';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 14px',
        background: disabled ? disabledColor : baseColor,
        borderRadius: 8,
        color: 'white',
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        transition: 'all 0.2s ease-in-out',
        boxShadow: disabled
          ? 'none'
          : '0 2px 6px rgba(167, 142, 247, 0.3)',
        transform: disabled ? 'none' : 'translateY(0)',
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(1px)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = '#B59AF8';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = baseColor;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      저장하기
    </button>
  );
};

export default SaveEpiBtn;
