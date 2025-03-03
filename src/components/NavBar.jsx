import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router'; // useRouter import
import MyPageModal from './Modal/MyPageModal';

const poppins = Poppins({ 
  weight: ['800'], 
  subsets: ['latin'],
  display: 'swap'
});

const Navbar = () => {
  const router = useRouter(); // useRouter 사용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 모달 토글 함수
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // 모달 상태 변경
  };

  return (
    <div style={{ width: 1440, height: 60, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 1162, display: 'inline-flex', zIndex: 10 }}>
      {/* 왼쪽 부분 (로고 및 텍스트) */}
      <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex', cursor: 'pointer' }} onClick={() => router.push('/')}>
        <div data-svg-wrapper style={{ position: 'relative' }}>
          {/* 로고가 들어가야 함 -> 나중에 대체하기  */}
          <svg width="39" height="35" viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="39" height="35" fill="#5E6CFF" />
          </svg>
        </div>

        {/* 제목 */}
        <div className={poppins.className} style={{ color: 'white', fontSize: 20, fontWeight: '800', lineHeight: '30.80px', wordWrap: 'break-word' }}>
          BetaReader
        </div>
      </div>

      {/* 오른쪽 부분 (버튼 및 아이콘) */}
      <div style={{ padding: 4, borderRadius: 100, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', position: 'relative' }}>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
          {/* 프로필 아이콘 부분 */}
          <img src="/profile_img.svg" alt="Profile" width={32} height={32} />

          {/* 드롭다운 화살표 아이콘 */}
          <div data-svg-wrapper style={{ position: 'relative' }}>
            <img 
              src="/dropdown_icon.svg" 
              alt="Profile" 
              width={24} 
              height={24} 
              onClick={toggleModal}
              style={{
                transition: 'transform 0.3s ease', // 부드러운 회전 효과
                transform: isModalOpen ? 'rotate(0deg)' : 'rotate(180deg)' // isModalOpen 상태에 따라 회전
              }}
            />
          </div>
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <div style={{
            position: 'absolute', // 드롭다운 아이콘을 기준으로 절대 위치
            top: '40px', // 아이콘 바로 아래에 위치
            right: '0',
            zIndex: 20, // 모달이 다른 요소 위에 올 수 있도록
          }}>
            <MyPageModal onClose={toggleModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
