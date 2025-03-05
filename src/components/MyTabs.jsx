import React from 'react';
import useStore from '@/store/useStore';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/router';  // useRouter 추가
import styles from '@/styles/MyTabs.module.css'; // CSS 모듈 임포트

export function MyTabs({ activeTab, setActiveTab }) {
  const { tabs, selectedTab, setSelectedTab } = useStore((state) => state);
  const router = useRouter();  // router 사용

  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);  // 탭 클릭 시 해당 탭으로 상태 변경

    // 탭 클릭 시 URL을 변경하여 탭 정보를 반영
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: tabId },  // 기존 URL 쿼리 파라미터에 tab 추가
    });
  };

  if (tabs.length === 0) {
    return null; // 탭이 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Tabs.Root value={selectedTab} onValueChange={handleTabChange} className={styles.tabs}>
      <Tabs.List className={styles.tabsList}>
        {tabs.map((tab) => {
          // `type`에 따라 탭을 렌더링
          if (tab.type === 'setting') {
            // 설정집 탭
            return (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={`${styles.tabTrigger} ${selectedTab === tab.id ? styles.selectedTab : ''}`}
              >
                {tab.label}
              </Tabs.Trigger>
            );
          }

          if (tab.type === 'episode') {
            // 원고 탭
            return (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={`${styles.tabTrigger} ${selectedTab === tab.id ? styles.selectedTab : ''}`}
              >
                {tab.label}
              </Tabs.Trigger>
            );
          }

          // 그 외의 탭 유형에 대해서는 아무 것도 렌더링하지 않음
          return null;
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}
