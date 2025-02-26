
'use client';

import React, { useState } from 'react';

import EpisodeTab from './EpisodeTab';
import Button1 from './Buttons/Button1';
import { create } from 'zustand'; // default -> named import로 수정
import useStore from '@/store/useStore';


const SidebarComponent = () => {

   const { tabs, addTab } = useStore();

  // "원고 추가하기" 버튼 클릭 시 호출되는 함수
  const handleAddTab = () => {
    // 새로운 탭을 추가할 때 `selected: false`로 설정
    const newTab = { label: '새 원고', selected: false };
    setTabs((prevTabs) => [...prevTabs, newTab]);
  };

  return (
    <div
      style={{
        width: '15rem', // 사이드바의 너비
        height: 'calc(100vh - 60px)', // 사이드바의 높이
        flexShrink: 0, // 사이드바가 축소되지 않도록 설정
        backgroundColor: 'var(--neutral-800, #1E1F24)', // 배경색
        padding: '3rem', // 여백 추가 (선택적)
        display: 'flex', // flexbox를 사용
        flexDirection: 'column', // 항목들이 세로로 정렬되도록 설정
        justifyContent: 'flex-start', // 콘텐츠가 위에서부터 시작하도록 설정
        alignItems: 'center', // 콘텐츠가 왼쪽에서 정렬되도록 설정
        position: 'relative', // 사이드바를 기준으로 절대 위치가 설정될 수 있도록
        zIndex: 1,
      }}
    >
      {/* 사이드바 내의 텍스트 항목들 */}
      <div
        style={{
          display: 'flex', // Flexbox 사용
          flexDirection: 'column', // 항목들을 세로로 배치
          gap: '3px', // 탭들 사이의 간격 설정
          alignItems: 'flex-start', // 아이템들을 왼쪽으로 정렬
        }}
      >
        <div style={{ padding: '0rem 0.8125rem' }}>
          <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
        </div>
        <div
          style={{
            width: '220px',
            display: 'flex', // Flexbox 사용
            flexDirection: 'column',
            gap: '28px', // 탭들 사이의 간격 설정
          }}
        >
          {/* 섹션 1. 제목 부분 */}
          <div
            style={{
              color: 'var(--neutral-white, #FFF)', // 텍스트 색상
              fontFamily: 'Pretendard', // 폰트
              fontSize: '1.5rem', // 폰트 크기
              fontWeight: '700', // 폰트 두께
              lineHeight: '140%', // 줄 간격
              wordWrap: 'break-word', // 긴 단어가 자동으로 줄바꿈
              padding: '0rem 0.8125rem',
            }}
          >
            '웹소설1'의 원고집
          </div>

          {/* 섹션 2. 탭 리스트 */}
          <div
            style={{
              display: 'flex', // Flexbox 사용
              flexDirection: 'column',
              gap: '6px', // 탭들 사이의 간격 설정
            }}
          >
            {/* 상태에 따라 탭 렌더링 */}
            {tabs.map((tab, index) => (
              <EpisodeTab key={index} label={tab.label} selected={tab.selected} />
            ))}
          </div>
        </div>
      </div>

      {/* 원고 추가하기 버튼 */}
      <Button1 onClick={() => addTab('새 원고')} />
    </div>
  );
};

export default SidebarComponent;
