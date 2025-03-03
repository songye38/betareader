import React from 'react';

const Button1 = ({ onClick, type }) => {
  // 기본 스타일 설정
  const baseStyle = {
    display: 'flex',
    width: 'auto',
    padding: '0.5rem 1.25rem 0.5rem 1rem',
    justifyContent: 'center',  // 수평 중앙 정렬
    alignItems: 'center',      // 수직 중앙 정렬
    gap: '0.25rem',
    background: 'var(--neutral-800, #2C2D34)', // 배경색
    border: 'none',
    borderRadius: '0.75rem', // 모서리 둥글기
    cursor: 'pointer',
    color: 'white',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '19.6px',
    wordWrap: 'break-word',
  };

  // type이 'down'일 때만 absolute 위치 적용
  const buttonStyle = type === 'down'
    ? {
        ...baseStyle,
        position: 'absolute',
        bottom: '22px',
        width: '12rem',
      }
    : baseStyle; // default 스타일은 position 관련 속성 제거

  const buttonText = type === 'down' ? '원고지 추가' : '작성';
  const iconSrc = type === 'down' ? '/plus_icon.svg' : '/write_icon.svg';

  return (
    <button onClick={onClick} style={buttonStyle}>
      {/* SVG Icon */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={iconSrc} alt="Profile" width={24} height={24} />
      </div>

      {/* Text */}
      <span>{buttonText}</span>
    </button>
  );
};

export default Button1;
