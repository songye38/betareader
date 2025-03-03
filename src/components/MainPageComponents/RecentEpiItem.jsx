'use client';
import React from 'react';

const RecentEpiItem = () => {
  return (
    <div 
      style={{
        width: 258, 
        height: 162, 
        paddingLeft: 28, 
        paddingRight: 28, 
        paddingTop: 24, 
        paddingBottom: 24, 
        background: '#2C2D34', 
        borderRadius: 20, 
        overflow: 'hidden', 
        border: '1px #4A4E5B solid', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        display: 'inline-flex',
        cursor : 'pointer',
      }}
    >
      {/* 상단 내용: 제목과 시간 */}
      <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <div 
          style={{
            color: 'white', 
            fontSize: 12, 
            fontFamily: 'Pretendard', 
            fontWeight: '400', 
            lineHeight: '16.80px', 
            wordWrap: 'break-word'
          }}
        >
          악역에게 꽃길을 깔아주려...
        </div>
        <div 
          style={{
            color: '#7B8091', 
            fontSize: 12, 
            fontFamily: 'Pretendard', 
            fontWeight: '400', 
            lineHeight: '16.80px', 
            wordWrap: 'break-word'
          }}
        >
          1시간 전
        </div>
      </div>

      {/* 하단 내용: 화 제목과 내용 */}
      <div 
        style={{
          alignSelf: 'stretch', 
          height: 85, 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start', 
          gap: 8, 
          display: 'flex'
        }}
      >
        <div 
          style={{
            color: 'white', 
            fontSize: 20, 
            fontFamily: 'Pretendard', 
            fontWeight: '600', 
            lineHeight: '28px', 
            wordWrap: 'break-word'
          }}
        >
          1화
        </div>
        <div 
          style={{
            alignSelf: 'stretch', 
            height: '61px', 
            color: '#989DAF', 
            fontSize: 16, 
            fontFamily: 'Pretendard', 
            fontWeight: '400', 
            lineHeight: '22.40px', 
            wordWrap: 'break-word',
            display: '-webkit-box',         // flexbox 형태로 처리
            overflow: 'hidden',             // 넘치는 부분 숨기기
            WebkitBoxOrient: 'vertical',    // 수직 정렬로 설정
            WebkitLineClamp: 2,             // 2줄까지만 표시
            textOverflow: 'ellipsis',       // 넘칠 경우 말줄임표(...)
          }}
        >
          비 내리는 밤이었다. 천둥이 하늘을 찢으며 번개가 성벽 위를 환하게 비췄다. 물에 젖은 돌벽이 마치 피를 흘리는 듯 붉게 빛났다.
        </div>
      </div>
    </div>
  );
};

export default RecentEpiItem;
