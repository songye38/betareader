import React, { useState } from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기

dayjs.extend(relativeTime);
dayjs.locale('ko');



const AllEpiItem = ({ episode, active, onClick, onDelete }) => {
  const { title, content, last_edited_at, is_feedback_mode } = episode;
  const [isHovered, setIsHovered] = useState(false);
  const relativeTimeDisplay = dayjs(last_edited_at).fromNow();
  const borderColor = active
    ? is_feedback_mode ? '#F27878' : '#6071FB'
    : 'transparent';


  // 배경색 조건에 따라 다르게 적용
  const getBackgroundColor = () => {
    if (active) return '#3A3B42';
    if (isHovered) return '#383940';
    return '#2C2D34';
  };

  return (

    <div
      onClick={onClick} // ✅ 여기 클릭 이벤트 연결
      style={{
        background: getBackgroundColor(),
        padding: '24px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: 'white',
        boxShadow: active
          ? `0 0 0 2px ${borderColor}`
          : '0 2px 8px rgba(0,0,0,0.15)',
        fontFamily: 'Pretendard',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 상단: 제목 + 상태 뱃지 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-start', alignItems: 'center' }}>
          <span
            style={{
              backgroundColor: borderColor || '#999',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '20px', 
            }}
          >
            {is_feedback_mode ? '피드백 받는중' : '작성중'}
          </span>
          {!is_feedback_mode && (
            <button
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
              onClick={onDelete}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
            >
              삭제
            </button>
          )}

        </div>
      </div>

      {/* 본문 요약 */}
      {content && (
        <div style={{ fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-line', color: '#CCCCCC' }}>
          {content.length > 120 ? content.slice(0, 120) + '...' : content}
        </div>
      )}

      {/* 최근 작성일 */}
      <div style={{ fontSize: '12px', color: '#888888', textAlign: 'right' }}>
        최근 작성일: {relativeTimeDisplay}
      </div>
    </div>
  );
};

export default AllEpiItem;
