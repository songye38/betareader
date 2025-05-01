'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StartPage from '@/components/MainPageComponents/StartPage';
import WritingPage from '@/components/MainPageComponents/WritingPage';
import useTabStore from '@/store/useTabStore';
import useSliderStore from '@/store/useSliderStore';
import useEpisodeForm from '@/hooks/useEpisode';
import useAuthStore from '@/store/useAuthStore';

const WritingFloatingMenu = () => {
  const { tabs, resetTabs, setTabs } = useTabStore();
  const { setActiveSlider } = useSliderStore();
  const router = useRouter();
  const { user } = useAuthStore();
  const [isReload, setIsReload] = useState(false);
  const {fetchEpisodesByManuId} = useEpisodeForm();

  const handleClick = async (tab_id, manuId) => {

    if (!(manuId && tab_id)) {
      console.error('필수 파라미터가 부족합니다.', { userId: user.id, manuId, tabId, notiId });
      return;
    }
    if (user.id && manuId) {
      const episodes = await fetchEpisodesByManuId(user.id, manuId);
      resetTabs();
      setTabs(episodes, tab_id);

      const selectedTab = useTabStore.getState().selectedTab;
      if (selectedTab?.is_feedback_mode) {
        setActiveSlider('feedback');
      }

      if (selectedTab.tab_id) {
        router.push(`/manu/${manuId}?tab=${selectedTab.tab_id}`);
      } else {
        console.error('selectedTab.tab_id is missing');
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const entries = performance.getEntriesByType("navigation");
      if (entries.length > 0 && entries[0].type === "reload") {
        console.log("✅ 새로고침 감지");

        setIsReload(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isReload) {
      try {
        const manuscriptStr = sessionStorage.getItem('manuscript');
        const selectedTabStr = sessionStorage.getItem('selectedTab');

        if (manuscriptStr && selectedTabStr) {
          const manuscript = JSON.parse(manuscriptStr);
          const selectedTab = JSON.parse(selectedTabStr);

          console.log("📦 세션에서 불러온 manuscript:", manuscript);
          console.log("📦 세션에서 불러온 selectedTab:", selectedTab);

          if (manuscript?.id && selectedTab?.tab_id) {
            handleClick(selectedTab.tab_id, manuscript.id);
          }
        } else {
          console.warn("⚠️ 세션에 manuscript나 selectedTab이 없음");
        }
      } catch (err) {
        console.error("❌ 세션 파싱 실패:", err);
      }
    }
  }, [isReload]);

  return (
    <div>
      {tabs.length === 0 ? <StartPage /> : <WritingPage />}
    </div>
  );
};

export default WritingFloatingMenu;
