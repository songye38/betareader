'use client';


import { useRouter } from 'next/router';
import React from 'react';
import SidebarComponent from "@/components/SidebarComponent";
import SettingFormComponent from "@/components/SettingFormComponent"; // SettingFormComponent 임포트
import useStore from '@/store/useStore'; // Zustand 스토어 사용

const SettingPage = () => {

    const router = useRouter();
  const { userId, manuscriptId } = router.query; // URL 파라미터에서 값 추출
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
      <SettingFormComponent />



      {/* {selectedTab && selectedTab.label === '설정집' ? (
        <SettingFormComponent /> // 선택된 탭 ID가 0이면 SettingFormComponent 렌더링
      ) : (
        <EpisodeFormComponent /> // 그 외에는 EpisodeFormComponent 렌더링
      )} */}
    </div>
    </div>
  );
};

export default SettingPage;

