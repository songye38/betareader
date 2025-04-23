import React from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기

// dayjs에 상대 시간 플러그인 사용
dayjs.extend(relativeTime);

// dayjs에 한국어 로케일 설정
dayjs.locale('ko');

const AlarmItem = ({ message , timeAgo, onClick ,isNew}) => {
      const relativeTimeDisplay = dayjs(timeAgo).fromNow();
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
          <b>{message}</b>
        </span>
        <div style={{ display: 'flex', gap: '4px',flexDirection:'row',alignItems:'center' }}>
            {isNew && (
                                <span
                                style={{
                                    color: '#B0B0B0',
                                    fontSize: '12px',
                                    fontFamily: 'Pretendard',
                                    lineHeight: '16px',
                                }}
                                >
                                새로운 댓글
                                </span>
            
            )}

            
            <span
            style={{
                color: '#B0B0B0',
                fontSize: '12px',
                fontFamily: 'Pretendard',
                lineHeight: '16px',
            }}
            >
            {relativeTimeDisplay}
            </span>
        </div>
      </div>
    </div>
  );
};

export default AlarmItem;
