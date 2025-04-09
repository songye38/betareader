import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SigninModal from './Modal/SigninModal';
import SignupModal from './Modal/SignupModal';

const NavSignSection = () => {
  const router = useRouter();
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleSigninModal = () => {
    setIsSigninModalOpen((prevState) => !prevState);
  };

  const toggleSignupModal = () => {
    setIsSignupModalOpen((prevState) => !prevState);
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
        style={buttonStyle}
        onClick={toggleSigninModal}
      >
        로그인
      </div>

      {/* 회원가입 버튼 */}
      <div
        style={buttonStyle}
        onClick={toggleSignupModal}
      >
        회원가입
      </div>

      {/* 로그인 모달 */}
      {isSigninModalOpen && (
        <div style={modalContainerStyle}>
          <SigninModal isOpen={isSigninModalOpen} onClose={toggleSigninModal} />
        </div>
      )}

      {/* 회원가입 모달 */}
      {isSignupModalOpen && (
        <div style={modalContainerStyle}>
          <SignupModal isOpen={isSignupModalOpen} onClose={toggleSignupModal} />
        </div>
      )}
    </div>
  );
};

// 버튼 스타일
const buttonStyle = {
  width: '100px',
  padding: '8px 4px',
  backgroundColor: '#A78EF7',
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
};

// 모달 컨테이너 스타일
const modalContainerStyle = {
  position: 'absolute',
  top: '60px',
  right: '0',
  zIndex: 100,
  backgroundColor: '#2C2D34',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
};

export default NavSignSection;
