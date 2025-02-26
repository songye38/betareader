import React from 'react';

const Tag = ({ children }) => {
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
        // border: '1px #4A4E5B solid',
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
      <img src="/close_icon.svg" alt="Profile" width={16} height={16} />
    </div>
  );
};

export default Tag;
