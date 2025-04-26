'use client';
import React, { useState,useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // 토스트 스타일 import

const CommentHeaderComponent = ({createdAt,episodeTitle,author}) => {
    const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const updateRemainingTime = () => {
      const createdTime = new Date(createdAt);
      const now = new Date();
      const totalMs = 24 * 60 * 60 * 1000;
      const elapsedMs = now - createdTime;
      const remainingMs = totalMs - elapsedMs;

      if (remainingMs <= 0) {
        setRemaining('00:00:00');
        return;
      }

      const hours = String(Math.floor(remainingMs / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((remainingMs % (1000 * 60)) / 1000)).padStart(2, '0');

      setRemaining(`${hours}:${minutes}:${seconds}`);
    };

    updateRemainingTime(); // 초기값 바로 계산

    const interval = setInterval(updateRemainingTime, 1000); // 매 초마다 업데이트
    return () => clearInterval(interval); // 언마운트 시 정리
  }, [createdAt]);


  return (
    <div 
      style={{
        width : '100vw',
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        height: '100px',
        borderBottom: '1px solid #4A4E5B',  // 아래에 선 추가
        paddingBottom: '32px',  // 선과 내용 간의 간격을 줌
        paddingTop : '32px',
      }}
    >

      <div style={{
        display:'flex',
        flexDirection:'row',
        gap:'40px',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}>
        
        {/* 텍스트 섹션 */}
        <div
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 18,
            display: 'inline-flex',
          }}
        >
          {/* 제목 */}
          <div
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: '33.60px',
              wordWrap: 'break-word',
            }}
          >
            {episodeTitle}
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: '33.60px',
              wordWrap: 'break-word',
            }}
          >
            {author}
          </div>
          {/* 만약 만료되지 않았다면 생성 시간도 표시하거나 추가 로직을 넣을 수 있음 */}
          <div style={{ textAlign: 'center',fontWeight:'600' ,fontSize: '14px',padding:'12px',border:'1px solid #8A94FF',borderRadius:'8px',backgroundColor:'#2A2B31'}}>
            ⏰ 남은 시간: {remaining}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommentHeaderComponent;
