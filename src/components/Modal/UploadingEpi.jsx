import React from 'react';

const UploadingEpi = () => {
  return (
    <div 
      style={{
        width: 446,
        height: 307,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 36,
        paddingBottom: 36,
        background: '#2C2D34',
        borderRadius: 24,
        border: '1px #4A4E5B solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        display: 'inline-flex'
      }}
    >
      <div data-svg-wrapper style={{ position: 'relative' }}>
        <svg width="92" height="91" viewBox="0 0 92 91" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="91" height="91" rx="20" fill="#A78EF7" />
        </svg>
      </div>
      
      <div 
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 12,
          display: 'flex'
        }}
      >
        <div 
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '28px',
            wordWrap: 'break-word'
          }}
        >
          원고 업로드 중...<br />베타리더들이 읽고 있는 중...
        </div>

        <div 
          style={{
            textAlign: 'center',
            color: '#BFC3D3',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '500',
            lineHeight: '22.40px',
            wordWrap: 'break-word'
          }}
        >
          독자들이 읽고 댓글을 달고 있어요<br />잠시만 기다려주세요
        </div>
      </div>
    </div>
  );
};

export default UploadingEpi;
