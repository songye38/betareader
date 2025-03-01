import React from 'react';
import { flushSync } from "react-dom";
import EpisodeTab from './EpisodeTab';
import Button1 from './Buttons/Button1';
import useStore from '@/store/useStore'; // Zustand 스토어 사용
import SettingTab from './SettingTab';

const SidebarComponent = () => {
  const { tabs, addTab, setSelectedTab, selectedTab,isSettingCreated,setIsSettingTabClicked ,setSelectedItemType} = useStore(); // Zustand 상태 가져오기

  const handleAddTab = () => {
    const { currentManuscriptId, addTab, setSelectedTab, incrementManuscriptId, setSelectedItemType } = useStore.getState();
    const newTabId = Date.now(); // 현재 시간을 기반으로 고유 ID 생성
    const newManuscriptId = currentManuscriptId; // 원고 ID로 사용
  
    // 새 탭 추가 데이터
    const newTab = {
      id: newTabId, // 고유 탭 ID
      label: `${newManuscriptId}화`, // 원고 ID와 연결된 이름
      manuscriptId: newManuscriptId, // 원고 ID
      selected: true, // 새 탭을 기본으로 선택되게 설정
    };
  
    // 새 탭 추가 및 선택 탭 설정
    addTab(newTab);
    setSelectedTab(newTabId);  // 탭 ID를 사용하여 selectedTab 업데이트
    console.log("sidebar에서 새로운 탭 추가 setSelectedTab",selectedTab);
    setIsSettingTabClicked(false);

    // useStore.setState((state) => ({
    //   selectedTab: newTabId // 동기적으로 selectedTab 설정
    // }));
    flushSync(() => {
      setSelectedTab(newTabId);
    });
  
    console.log("selectedTab 업데이트 완료 (동기적):", useStore.getState().selectedTab);
  

    console.log("set state",selectedTab)
  
    // 원고 ID 증가
    incrementManuscriptId(); // 원고 ID 증가
  
    setSelectedItemType('episode'); // 새 탭을 EpisodeFormComponent로 설정



  };
  

  const handleTabClick=()=>{
    setIsSettingTabClicked(true);
    setSelectedTab(null);
    setSelectedItemType('setting');
  }
  
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
          {isSettingCreated && <SettingTab onClick={handleTabClick} selected={setSelectedTab} />}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              height:'340px',
              overflow:'scroll',
            }}
          >
            {/* 탭 렌더링 */}
            {tabs.map((tab) => (
              <EpisodeTab
              key={tab.id} // 각 탭의 id를 key로 설정
              id={tab.id} // id 전달
              label={tab.label}
              type = 'episode'
              selected={selectedTab === tab.id} // 선택 여부 확인
              // onClick={() => setSelectedTab(tab.id)} // 선택된 탭 변경
              onClick={() => {
                setSelectedTab(tab.id); // 탭 선택
                setSelectedItemType('episode');
              }}
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
