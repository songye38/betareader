'use client';

import React from 'react';
import SidebarComponent from "@/components/SidebarComponent";
import EpisodeFormComponent from "@/components/EpisodeFormComponent";
import useStore from '@/store/useStore'; // Zustand 스토어 사용

const EpiPage = () => {
  // Zustand에서 탭 상태 가져오기
  const { tabs } = useStore();
  
  // 현재 선택된 탭 찾기
  const selectedTab = tabs.find(tab => tab.selected);

  return (
    <div>
        <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '16px',
    }}>

      <SidebarComponent />
      {/* 선택된 탭 ID에 따라 조건부 렌더링 */}
      <EpisodeFormComponent />
    </div>
    </div>

  );
};

export default EpiPage;
