import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button1 from './Buttons/Button1';
import useTabStore from '@/store/useTabStore'; // Zustand 스토어 사용
import { MyTabs } from './MyTabs';

const SidebarComponent = () => {
  const router = useRouter();
  const { manuscripts, addTab, setSelectedTab, currentManuscriptId, incrementManuscriptId,selectedTab,tabs } = useTabStore();

  const handleAddTab = () => {
    const newTabId = Date.now(); // 고유한 ID 생성
    const newEpisodeId = currentManuscriptId; // 현재 원고 ID 사용
  
    const newTab = {
      type: 'episode',
      id: newTabId,
      no: newEpisodeId, // ← 추가됨
      label: `${newEpisodeId}화`,
      EpisodeId: newEpisodeId,
      selected: true,
    };
  
    addTab(newTab); // Zustand 상태 업데이트
    
    // 현재 탭이 새로 추가된 탭과 다를 경우에만 선택
    if (newTabId !== selectedTab.id) {
      setSelectedTab(newTabId, newEpisodeId); // 새 탭을 활성화
    }
  
    // 탭을 추가한 후, URL을 해당 탭 ID로 업데이트
    router.push({
      pathname: router.pathname, // 현재 경로 유지
      query: { ...router.query, tab: newTabId }, // tab 파라미터를 새로운 탭 ID로 업데이트
    });
  
    incrementManuscriptId(); // 다음 원고 ID 증가
  };
  
  useEffect(() => {
    console.log('Tabs changed:', tabs); // tabs 상태 변경 시 콘솔 출력
  }, [tabs]);
  
  
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
            height:'100%',
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
          {/* {isSettingCreated && <SettingTab onClick={handleTabClick} selected={setSelectedTab} />} */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              overflow:'scroll',
            }}
          >
            {/* 탭 렌더링 */}

            <MyTabs />
          </div>
        </div>
      </div>

      {/* 원고 추가하기 버튼 */}
      <Button1 onClick={handleAddTab} type={'down'} />
    </div>
  );
};

export default SidebarComponent;
