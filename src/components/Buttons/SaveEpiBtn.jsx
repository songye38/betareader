'use client';

import React from 'react';

const SaveEpiBtn = ({ disabled,onClick }) => {
  return (
    <div
    onClick={onClick} // onClick 핸들러 전달
      style={{
        width: '288px',
        height: '100%',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        background: '#5E6CFF',
        borderRadius: 16,
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
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '28px',
          wordWrap: 'break-word',
        }}
      >
        저장하기
      </div>
    </div>
  );
};

export default SaveEpiBtn;
