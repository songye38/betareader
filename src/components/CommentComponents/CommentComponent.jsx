import React, { useState } from 'react';

const CommentComponent = ({ id,name,text }) => {


  return (
    <div style={{ width: '80%', height: 'auto', display: 'flex', flexDirection: 'row', position: 'relative' }}>


      {/* 첫 번째 섹션 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: 28,
          paddingRight: 28,
          paddingTop: 22,
          paddingBottom: 22,
          background: '#1E1F24',
          borderRadius: 24,
          border: '1px #4A4E5B solid',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          display: 'inline-flex',
          // marginLeft: 50, // 이미지가 겹치므로 좌측 여백을 주어 텍스트가 잘리지 않게 조정
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'inline-flex',
          }}
        >
          {/* Name */}
          <div
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: '22.4px',
              wordWrap: 'break-word',
            }}
          >
            {name}
          </div>
          {/* Text */}
          <div
            style={{
              color: '#D9DEEE',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '22.4px',
              wordWrap: 'break-word',
            }}
          >
            {text}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommentComponent;
