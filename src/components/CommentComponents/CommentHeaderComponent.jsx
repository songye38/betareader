'use client';
import React, { useState,useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css'; // 토스트 스타일 import

const CommentHeaderComponent = ({createdAt,episodeTitle,author}) => {
  const router = useRouter();
  // 북마크 상태 관리 (false: 빈 북마크, true: 채워진 북마크)
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  // 북마크 클릭 시 상태 변경 및 토스트 메시지 표시
  const handleBookmarkClick = () => {
    const newBookmarkStatus = !isBookmarked; // 새로운 북마크 상태 계산
    setIsBookmarked(newBookmarkStatus); // 북마크 상태 반전
  };

  const handleGoBack = () => {
    router.back();  // 브라우저의 뒤로가기 기능을 호출
  };

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

          {/* 설명 */}
          {/* <div
            style={{
              color: '#D9DEEE',
              fontSize: 18,
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '25.20px',
              wordWrap: 'break-word',
            }}
          >
            1화 원고 1차 초안
          </div> */}
        </div>

      </div>

      {/* 북마크 버튼 (아이콘 클릭 시 상태에 따라 변경) */}
      {/* <img 
        src={isBookmarked ? "/bookmark_filled.svg" : "/save_icon.svg"} 
        alt="Bookmark" 
        width={24} 
        height={24} 
        onClick={handleBookmarkClick}  // 클릭 시 상태 변경 및 토스트 표시
        style={{ cursor: 'pointer' }}  // 클릭 가능한 커서 스타일 추가
      /> */}
      
      {/* 토스트 메시지를 위한 컨테이너 */}
      <ToastContainer />
    </div>
  );
};

export default CommentHeaderComponent;
