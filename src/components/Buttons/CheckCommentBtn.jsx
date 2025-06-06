'use client';

import React from 'react';
import { toast } from 'react-toastify';

const CheckCommentBtn = ({ disabled,onClick,title }) => {
  console.log("disabled",disabled);


  const handleClick = (e) => {
    if (disabled) {
      toast.info('먼저 저장해주세요:)');
      return;
    }
    onClick(e);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 'auto',
        height: 'auto',
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 8,
        paddingBottom: 8,
        background: '#A78EF7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        display: 'inline-flex',
        opacity: disabled ? 0.5 : 1, // 비활성화 상태일 때 opacity 조정
        cursor: disabled ? 'not-allowed' : 'pointer', // 비활성화 시 커서 변경pointer
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 14,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '28px',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default CheckCommentBtn;
