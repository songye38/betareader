'use client';

import React from 'react';
import useTabStore from '@/store/useTabStore';

const SaveEpiBtn = ({ disabled, onClick }) => {
  const baseColor = '#A78EF7';
  const disabledColor = '#D1C4F7';
  const {tabs,selectedTab} = useTabStore();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 14px',
        background: disabled ? disabledColor : baseColor,
        borderRadius: 8,
        color: 'white',
        fontSize: 14,
        fontFamily: 'Pretendard',
        fontWeight: 600,
        lineHeight: '20px',
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
      임시저장
    </button>
  );
};

export default SaveEpiBtn;
