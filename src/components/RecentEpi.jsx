'use client';
import React from 'react';

const RecentEpi = () => {
  return (
    <div 
      style={{
        width: '100%', 
        height: '100%', 
        paddingLeft: 28, 
        paddingRight: 28, 
        paddingTop: 24, 
        paddingBottom: 24, 
        background: '#2C2D34', 
        borderRadius: 20, 
        overflow: 'hidden', 
        border: '1px solid #4A4E5B', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        display: 'inline-flex',
        textAlign: 'left', // 부모 기준 좌측 정렬
        gap : '12px',

      }}
    >
      {/* 제목 & 내용 */}
      <div 
        style={{
          width: '100%', 
          height: '100%', 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start', 
          gap: 8, 
          display: 'inline-flex'
        }}
      >
        <div 
          style={{
            color: 'white', 
            fontSize: 20, 
            fontFamily: 'Pretendard, sans-serif', 
            fontWeight: 600, 
            lineHeight: '28px', 
            wordWrap: 'break-word'
          }}
        >
          1화
        </div>
        <div 
          style={{
            width: '100%', 
            height: '100%', 
            color: '#989DAF', 
            fontSize: 16, 
            fontFamily: 'Pretendard, sans-serif', 
            fontWeight: 400, 
            lineHeight: '22.4px', 
            wordWrap: 'break-word'
          }}
        >
          비 내리는 밤이었다. 천둥이 하늘을 찢으며 번개가 성벽 위를 환하게 비췄다. 
          물에 젖은 돌벽이 마치 피를 흘리는 듯 붉게 빛났다.
        </div>
      </div>

      {/* 웹소설 제목 & 구분선 & 시간 */}
      <div 
        style={{
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 4, 
          display: 'inline-flex'
        }}
      >
        <div 
          style={{
            color: '#7B8091', 
            fontSize: 12, 
            fontFamily: 'Pretendard, sans-serif', 
            fontWeight: 400, 
            lineHeight: '16.8px', 
            wordWrap: 'break-word'
          }}
        >
          웹소설 1
        </div>
        <div 
          style={{
            width: 4, 
            height: 4, 
            background: '#7B8091', 
            borderRadius: '50%'
          }} 
        />
        <div 
          style={{
            color: '#7B8091', 
            fontSize: 12, 
            fontFamily: 'Pretendard, sans-serif', 
            fontWeight: 400, 
            lineHeight: '16.8px', 
            wordWrap: 'break-word'
          }}
        >
          1시간 전
        </div>
      </div>
    </div>
  );
};

export default RecentEpi;
