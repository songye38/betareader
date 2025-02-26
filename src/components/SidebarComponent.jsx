'use client';

import React from 'react';
import EpisodeTab from './EpisodeTab';
import Button1 from './Buttons/Button1';
import useStore from '@/store/useStore'; // Zustand 스토어 사용

const SidebarComponent = () => {
  const { tabs, addTab, setSelectedTab } = useStore(); // useStore에서 상태와 함수 가져오기

  // "원고 추가하기" 버튼 클릭 시 호출되는 함수
  const handleAddTab = () => {
    const newTab = { label: '새 원고', selected: false };
    addTab(newTab); // 새 탭을 추가하면서 selected: true로 설정됨
  };

  // 탭 클릭 시 선택 상태 변경 함수
  const handleTabClick = (id) => {
    setSelectedTab(id); // id를 전달하여 상태 업데이트
  };

  return (
    <div
      style={{
        width: '15rem',
        height: 'calc(100vh - 60px)',
        flexShrink: 0,
        backgroundColor: 'var(--neutral-800, #1E1F24)',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ padding: '0rem 0.8125rem' }}>
          <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
        </div>
        <div
          style={{
            width: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <div
            style={{
              color: 'var(--neutral-white, #FFF)',
              fontFamily: 'Pretendard',
              fontSize: '1.5rem',
              fontWeight: '700',
              lineHeight: '140%',
              wordWrap: 'break-word',
              padding: '0rem 0.8125rem',
            }}
          >
            '웹소설1'의 원고집
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* 탭 렌더링 */}
            {tabs.map((tab) => (
              <EpisodeTab
                key={tab.id} // 고유 id로 key 설정
                label={tab.label}
                selected={tab.selected}
                onClick={() => handleTabClick(tab.id)} // id를 전달하여 선택된 탭을 처리
              />
            ))}
          </div>
        </div>
      </div>

      {/* 원고 추가하기 버튼 */}
      <Button1 onClick={handleAddTab} />
    </div>
  );
};

export default SidebarComponent;
