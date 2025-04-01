import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router'; // useRouter import
import NavSignSection from './NavSignSection';
import useAuthStore from '@/store/useAuthStore';
import NavUserSection from './NavUserSection';
import MyPageModal from './Modal/MyPageModal';

// TODO :화면 어디든지 클릭하면 모달이 사라지도록 해야함
const poppins = Poppins({ 
  weight: ['800'], 
  subsets: ['latin'],
  display: 'swap'
});

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter(); // useRouter 사용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 모달 토글 함수
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // 모달 상태 변경
  };

  return (
    <div 
      style={{ 
        width: '100%',  // 부모 요소의 너비를 100%로 설정
        height: '100%',  // 고정 높이
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '10px',
        paddingBottom: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'auto',  // 자식 요소들이 flex로 자동 배치되게 설정
        display: 'flex', // 부모 요소에 flexbox 적용
        zIndex: 10,
        position: 'relative', // 상대적인 위치로 설정
      }}
    >
      {/* 왼쪽 부분 (로고 및 텍스트) */}
      <div 
        style={{
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          gap: '8px', 
          display: 'flex', 
          flex: 1, // 공간을 균등하게 차지하도록 설정
        }} 
      >
        <img src="/final_logo.svg" alt="Profile" width={39} height={35}/>
        
        {/* 제목 */}
        <div 
          onClick={() => router.push('/')}
          className={poppins.className} 
          style={{
            cursor: 'pointer',
            color: 'white',
            fontSize: '20px',
            fontWeight: '800',
            lineHeight: '30.8px',
            wordWrap: 'break-word',
          }}
        >
          BetaReader
        </div>
      </div>

      {/* 오른쪽 부분 (버튼 및 아이콘) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      {user ? <NavUserSection user={user} /> : <NavSignSection />}
      </div>
    </div>
  );
};

export default Navbar;
