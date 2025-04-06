'use client';

import React from 'react';

const SaveEpiBtn = ({ disabled,onClick }) => {
  return (
    <div
    onClick={onClick} // onClick 핸들러 전달
      style={{
        width: 'auto',
        height: 'auto',
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 8,
        paddingBottom: 8,
        background: '#5E6CFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        display: 'inline-flex',
        opacity: disabled ? 0.5 : 1, // 비활성화 상태일 때 opacity 조정
        cursor: disabled ? 'not-allowed' : 'pointer', // 비활성화 시 커서 변경
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 14,
          fontFamily: 'Pretendard',
          fontWeight: '500',
          lineHeight: '28px',
          wordWrap: 'break-word',
        }}
      >
        임시저장
      </div>
    </div>
  );
};

export default SaveEpiBtn;
