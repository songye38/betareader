'use client';

import React from 'react';

const CheckCommentBtn = () => {
  return (
    <div
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
        cursor: 'pointer' // 클릭할 수 있다는 느낌을 주기 위해 cursor 추가
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
        댓글 보기
      </div>
    </div>
  );
};

export default CheckCommentBtn;
