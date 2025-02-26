import React from 'react';

const Tag = ({ children, onDelete }) => {
  return (
    <div
      style={{
        width: 'auto',
        height: 32,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 8,
        background: '#3A3D46',
        borderRadius: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'Pretendard',
          fontWeight: '500',
          lineHeight: '19.60px',
          wordWrap: 'break-word',
        }}
      >
        {children}
      </div>
      <img
        src="/close_icon.svg"
        alt="Delete"
        width={16}
        height={16}
        style={{ cursor: 'pointer' }}
        onClick={onDelete}  // 아이콘 클릭 시 onDelete 함수 실행
      />
    </div>
  );
};

export default Tag;
