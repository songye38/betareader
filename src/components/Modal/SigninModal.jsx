'use client';
import React from 'react';
import Signin from '../Signin';

const SigninModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 닫히면 렌더링하지 않음

  return (
    <div
      style={{
        width: 'auto',
        height: 'auto',
        padding: '20px',
        background: '#2C2D34',
        borderRadius: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        display: 'inline-flex',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 12,
            display: 'inline-flex',
          }}
        >
          {/* Signin Modal 내용 */}
          <Signin />
        </div>

        {/* X 아이콘 클릭 시 팝업 닫기 */}
        <img
          src="/close_icon.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={onClose} // 상위 컴포넌트에서 닫기 로직 처리
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default SigninModal;
