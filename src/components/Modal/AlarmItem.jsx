import React from 'react';

const AlarmItem = ({ commenterName, episodeTitle, timeAgo, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3A3B41',
        padding: '12px 16px',
        borderRadius: '12px',
        gap: '12px',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #52545A',
        transition: 'background 0.2s ease-in-out',
      }}
    >
      <img
        src="/notification-text.svg"
        alt="알림"
        width={24}
        height={24}
        style={{ flexShrink: 0 }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '14px',
            fontFamily: 'Pretendard',
            fontWeight: 500,
            lineHeight: '20px',
            marginBottom: '2px',
          }}
        >
          <b>{commenterName}</b>님이 <b>{episodeTitle}</b>에 댓글을 남겼어요.
        </span>
        <span
          style={{
            color: '#B0B0B0',
            fontSize: '12px',
            fontFamily: 'Pretendard',
            lineHeight: '16px',
          }}
        >
          {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default AlarmItem;
