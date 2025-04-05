'use client';
import React from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기

// dayjs에 상대 시간 플러그인 사용
dayjs.extend(relativeTime);

// dayjs에 한국어 로케일 설정
dayjs.locale('ko');


const RecentEpiItem_mini = ({ episode }) => {
  const relativeTimeDisplay = dayjs(episode.last_edited_at).fromNow();
  return (
    <div 
      style={{
        width: '100%',
        height: 162,
        padding: 20,
        background: '#2C2D34',
        borderRadius: 16,
        border: '1px solid #3F414A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 12,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {/* 상단 시간 정보 */}
      <div style={{
        fontSize: 12,
        fontFamily: 'Pretendard',
        fontWeight: 400,
        color: '#9FA4B0',
      }}>
        {relativeTimeDisplay}
      </div>

      {/* 본문 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'Pretendard',
          }}
        >
          {episode.tab_no}화
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#D1D5DB',
            fontFamily: 'Pretendard',
          }}
        >
          피드백 받는중
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#A1A6B1',
            fontFamily: 'Pretendard',
          }}
        >
          피드백 개수 4/10
        </div>
      </div>
    </div>
  );
};
export default RecentEpiItem_mini;