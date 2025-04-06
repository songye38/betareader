import React from 'react';

const FeedbackItem = ({ username, content, timestamp }) => {
  return (
    <div
      style={{
        background: '#2C2D34',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 0 0 1px #3A3D46',
        color: 'white',
        fontFamily: 'Pretendard',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
      }}
    >
      {/* 작성자 + 시간 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{username}</div>
        <div style={{ fontSize: 12, color: '#A0A0A0' }}>{timestamp}</div>
      </div>

      {/* 피드백 내용 */}
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </div>

      {/* 좋아요, 답글 등 추가 액션 버튼 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {/* <button
          style={{
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#2C2D34',
            border: '1px solid #3A3D46',
            borderRadius: 6,
            fontFamily: 'Pretendard',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
        >
          좋아요
        </button> */}
        {/* <button
          style={{
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#2C2D34',
            border: '1px solid #3A3D46',
            borderRadius: 6,
            fontFamily: 'Pretendard',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
        >
          답글
        </button> */}
      </div>
    </div>
  );
};

export default FeedbackItem;
