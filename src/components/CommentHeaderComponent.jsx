'use client';
import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 토스트 스타일 import

const CommentHeaderComponent = () => {
  // 북마크 상태 관리 (false: 빈 북마크, true: 채워진 북마크)
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 클릭 시 상태 변경 및 토스트 메시지 표시
  const handleBookmarkClick = () => {
    const newBookmarkStatus = !isBookmarked; // 새로운 북마크 상태 계산
    setIsBookmarked(newBookmarkStatus); // 북마크 상태 반전

    const successToastId = "bookmark-added-toast"; // 북마크 추가에 대한 고유 ID
    const infoToastId = "bookmark-removed-toast"; // 북마크 제거에 대한 고유 ID

    // 기존 토스트 메시지 닫기 (모든 토스트를 닫음)
    // toast.dismiss(); // 모든 토스트 닫기

    // // 새로운 북마크 상태에 따른 토스트 메시지 표시
    // if (newBookmarkStatus) {
    //   toast.success('북마크에 추가되었습니다!', {
    //     toastId: successToastId, // 고유한 ID를 설정하여 중복 방지
    //     position: "bottom-center", // 토스트 위치
    //     autoClose: 1200, // 1.2초 후 자동으로 사라짐
    //     hideProgressBar: true, // 진행바 숨기기
    //     closeButton: true, // 닫기 버튼 추가
    //     theme: "dark", // 다크 테마
    //     draggable: false, // 드래그 가능
    //     pauseOnHover: false, // 마우스 오버 시 일시 정지
    //     limit: 1, // 최대 1개 토스트만 표시
    //     transition: Slide, // 슬라이드 효과
    //   });
    // } else {
    //   toast.info('북마크에서 제거되었습니다.', {
    //     toastId: infoToastId, // 고유한 ID를 설정하여 중복 방지
    //     position: "bottom-center", 
    //     autoClose: 1200,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     limit: 1, // 최대 1개 토스트만 표시
    //     transition: Slide, // 슬라이드 효과
    //     theme: "dark", // 다크 테마
    //   });
    // }
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
        height: '100%',
        borderBottom: '1px solid #4A4E5B',  // 아래에 선 추가
        paddingBottom: '32px',  // 선과 내용 간의 간격을 줌
        paddingTop : '32px',
      }}
    >

      <div style={{
        display:'flex',
        flexDirection:'row',
        gap:'40px',
        width:'80%',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}>
          
        {/* 뒤로가기 아이콘 */}
        <img src="/back_icon.svg" alt="Profile" width={24} height={24}/>

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
            웹소설 1의 1화
          </div>

          {/* 설명 */}
          <div
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
          </div>
        </div>

      </div>

      {/* 북마크 버튼 (아이콘 클릭 시 상태에 따라 변경) */}
      <img 
        src={isBookmarked ? "/bookmark_filled.svg" : "/save_icon.svg"} 
        alt="Bookmark" 
        width={24} 
        height={24} 
        onClick={handleBookmarkClick}  // 클릭 시 상태 변경 및 토스트 표시
        style={{ cursor: 'pointer' }}  // 클릭 가능한 커서 스타일 추가
      />
      
      {/* 토스트 메시지를 위한 컨테이너 */}
      <ToastContainer />
    </div>
  );
};

export default CommentHeaderComponent;
