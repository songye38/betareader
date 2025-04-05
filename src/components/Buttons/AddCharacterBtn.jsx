import React, { useState } from 'react';

const AddCharacterBtn = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%', 
        height: 162, 
        padding: '24px 28px', 
        background: isHovered ? '#6071FB' : '#2C2D34', // ✅ Hover 배경색
        borderRadius: 20, 
        overflow: 'hidden', 
        border: '1px #4A4E5B solid', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        display: 'flex',
        cursor : 'pointer',
        transition: 'background 0.2s ease-in-out', // ✅ 부드럽게 변경
      }}
    >
      <img src="/plus_icon.svg" alt="Profile" width={24} height={24} />
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 20,
          fontFamily: "Pretendard",
          fontWeight: "600",
          lineHeight: "28px",
          wordWrap: "break-word",
        }}
      >
        캐릭터 <br /> 관리하기
      </div>
    </div>
  );
};

export default AddCharacterBtn;
