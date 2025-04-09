import React from 'react';
import { useState } from 'react';
import SettingFormComponent from '../SettingFormComponent';


const UpdateSettingBtn = ({onClick}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };


  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          display: 'flex',
          width: 'auto',
          padding: '0.5rem 1.25rem 0.5rem 1rem',
          justifyContent: 'center',  // 수평 중앙 정렬
          alignItems: 'center',      // 수직 중앙 정렬
          gap: '0.25rem',
          background: 'var(--neutral-800, #A78EF7)', // 배경색
          border: 'none',
          borderRadius: '0.75rem', // 모서리 둥글기
          cursor: 'pointer',
          color: 'white',
          fontFamily: 'Pretendard',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '19.6px',
          wordWrap: 'break-word',
        }}
      >
        {/* SVG Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/setting_icon.svg" alt="Profile" width={16} height={16} />
        </div>

        {/* Text */}
        <span>수정하기</span>
      </button>
      {isPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // 어두운 배경
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // 최상위로 설정
          }}
          onClick={() => setIsPopupVisible(false)} // 클릭 시 닫힘
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SettingFormComponent onClose={() => setIsPopupVisible(false)} />
          </div>
        </div>
      )}
  </div>

  );
};

export default UpdateSettingBtn;
