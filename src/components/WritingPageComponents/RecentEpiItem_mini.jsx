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
        paddingLeft: 28, 
        paddingRight: 28, 
        paddingTop: 24, 
        paddingBottom: 24, 
        background: '#2C2D34', 
        borderRadius: 20, 
        overflow: 'hidden', 
        border: '1px #4A4E5B solid', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        display: 'inline-flex',
        cursor : 'pointer',
      }}
    >
      {/* 상단 내용: 제목과 시간 */}
      <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <div 
          style={{
            color: '#7B8091', 
            fontSize: 12, 
            fontFamily: 'Pretendard', 
            fontWeight: '400', 
            lineHeight: '16.80px', 
            wordWrap: 'break-word'
          }}
        >
          {relativeTimeDisplay} {/* 동적으로 시간 설정 (ex. "1시간 전") */}
        </div>
      </div>

      {/* 하단 내용: 화 제목과 내용 */}
      <div 
        style={{
          alignSelf: 'stretch', 
          height: 85, 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start', 
          gap: 8, 
          display: 'flex'
        }}
      >
        <div 
          style={{
            color: 'white', 
            fontSize: 20, 
            fontFamily: 'Pretendard', 
            fontWeight: '600', 
            lineHeight: '28px', 
            wordWrap: 'break-word'
          }}
        >
          {episode.tab_no}화 {/* 동적으로 화 번호 설정 */}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          <div 
            style={{
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'Pretendard', 
              fontWeight: '500', 
              lineHeight: 'auto', 
              wordWrap: 'break-word'
            }}
          >
            피드백 받는중 {/* 동적으로 화 번호 설정 */}
          </div>
          <div 
            style={{
              color: 'white', 
              fontSize: 11, 
              fontFamily: 'Pretendard', 
              fontWeight: '700', 
              lineHeight: 'auto', 
              wordWrap: 'break-word'
            }}
          >
            피드백 개수 4/10 {/* 동적으로 화 번호 설정 */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentEpiItem_mini;
