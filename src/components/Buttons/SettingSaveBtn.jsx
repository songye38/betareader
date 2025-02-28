'use client';

import React from 'react';

const SettingSaveBtn = ({ onClick, disabled }) => {
  return (
    <div
      style={{
        width: 368,
        height: 62,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        background: disabled ? '#2F3138' : '#5E6CFF', // disabled일 때 색상 변경
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer', // disabled일 때는 커서 변경
      }}
      onClick={!disabled ? onClick : null} // disabled일 때 클릭 이벤트 방지
    >
      <div
        style={{
          textAlign: 'center',
          color: disabled ? '#7B8091' : 'white', // disabled일 때 색상 변경
          fontSize: 24,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        입력 내용 저장
      </div>
    </div>
  );
};

export default SettingSaveBtn;
