'use client';
import React, { useState } from 'react';
import Signup from '../Signup';

const SignupModal = () => {
  const [isVisible, setIsVisible] = useState(true); // 팝업의 보임 여부 상태

  const closePopup = () => {
    setIsVisible(false); // 팝업을 숨김
  };

  if (!isVisible) {
    return null; // isVisible이 false일 때는 아무것도 렌더링하지 않음
  }

  return (
    <div
      style={{
        width: 'auto',
        height: 'auto',
        padding:20,
        background: '#2C2D34',
        borderRadius: 24,
        // border: '1px #4A4E5B solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        display: 'inline-flex',
        overflow: 'hidden', // 자식 요소가 벗어나는 것을 방지
      }}
    >
      {/* X 아이콘 클릭 시 팝업 닫기 */}
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
          <Signup />
        </div>

        {/* Close button (X 아이콘) */}
        <img
          src="/close_icon.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={closePopup}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default SignupModal;
