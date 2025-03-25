import React, { useState } from 'react';
import { useRouter } from 'next/router'; // useRouter import
import SigninModal from './Modal/SigninModal'; // SigninModal 컴포넌트 import
import SignupModal from './Modal/SignupModal'; // SignupModal 컴포넌트 import

const NavSignSection = () => {
  const router = useRouter(); // useRouter 사용
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false); // 로그인 모달 상태 관리
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // 회원가입 모달 상태 관리

  // 로그인 모달 토글 함수
  const toggleSigninModal = () => {
    setIsSigninModalOpen((prevState) => !prevState); // 로그인 모달 상태 변경
  };

  // 회원가입 모달 토글 함수
  const toggleSignupModal = () => {
    setIsSignupModalOpen((prevState) => !prevState); // 회원가입 모달 상태 변경
  };

  return (
    <div style={{
      width: 'auto',
      padding: '12px 12px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    }}>
      {/* 로그인 버튼 */}
      <div
        style={{
          width: '100px',
          padding: '8px 4px',
          backgroundColor: '#5E6CFF',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={toggleSigninModal} // 클릭 시 로그인 모달 토글
      >
        로그인
      </div>

      {/* 회원가입 버튼 */}
      <div
        style={{
          width: '100px',
          padding: '8px 4px',
          backgroundColor: '#5E6CFF',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={toggleSignupModal} // 클릭 시 회원가입 모달 토글
      >
        회원가입
      </div>

      {/* 로그인 모달 표시 */}
      {isSigninModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            zIndex: 100,
            backgroundColor: '#2C2D34',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <SigninModal onClose={toggleSigninModal} /> {/* SigninModal 연결 */}
        </div>
      )}

      {/* 회원가입 모달 표시 */}
      {isSignupModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            zIndex: 100,
            backgroundColor: '#2C2D34',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <SignupModal onClose={toggleSignupModal} /> {/* SignupModal 연결 */}
        </div>
      )}
    </div>
  );
};

export default NavSignSection;
