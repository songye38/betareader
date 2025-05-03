'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StartPage from '@/components/MainPageComponents/StartPage';
import WritingPage from '@/components/MainPageComponents/WritingPage';
import useTabStore from '@/store/useTabStore';
import useSliderStore from '@/store/useSliderStore';
import useEpisodeForm from '@/hooks/useEpisode';
import MobileAlert from '@/components/MobileAlert';

const WritingFloatingMenu = () => {
  const { tabs, resetTabs, setTabs } = useTabStore();
  const { setActiveSlider } = useSliderStore();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [hasAccess, setHasAccess] = useState(true);
  const { fetchEpisodesByManuId } = useEpisodeForm();
  const [isReload, setIsReload] = useState(false);

  const getLocalStorageData = (key) => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          return JSON.parse(storedData);
        } catch (err) {
          console.error(`❌ ${key} 파싱 실패:`, err);
        }
      }
    }
    return null;
  };

  const fetchEpisodeData = async () => {
    const manuscript = getLocalStorageData('manuscript');
    const selectedTab = getLocalStorageData('selectedTab');

    console.log("로컬 스토리지에서 가져온 데이터", { manuscript, selectedTab });

    if (userId && manuscript?.id && selectedTab?.tab_id) {
      const episodes = await fetchEpisodesByManuId(userId, manuscript.id);
      resetTabs();
      setTabs(episodes, selectedTab.tab_id); // 여기도 오타 고침 (tab_id)
      console.log("episodes에 내용이 채워지는가?", episodes);

      if (selectedTab?.is_feedback_mode) {
        setActiveSlider('feedback');
      }

      if (selectedTab?.tab_id) {
        router.push(`/manu/${manuscript.id}?tab=${selectedTab.tab_id}`);
      } else {
        console.error('selectedTab.tab_id is missing');
      }
    } else {
      console.warn("⚠️ 필요한 데이터가 부족합니다.");
    }
  };

  // 새로고침 감지
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const entries = performance.getEntriesByType("navigation");
      if (entries.length > 0 && entries[0].type === "reload") {
        console.log("✅ 새로고침 감지");
        setIsReload(true);
      }
    }
  }, []);

  // 최초 렌더링 때 userId 가져오기
  useEffect(() => {
    const userData = getLocalStorageData('auth-storage');
    if (userData?.state?.user?.id) {
      setUserId(userData.state.user.id); // userId만 세팅
    } else {
      console.warn('접근권한이 없습니다.');
      setHasAccess(false);
    }
  }, []);

  // userId가 세팅되거나 새로고침 시 데이터 가져오기
  useEffect(() => {
    if (userId) {
      fetchEpisodeData();
    }
  }, [userId, isReload]); // userId가 생기거나 새로고침이 감지되면

  if (!hasAccess) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: 'white' }}>
        잘못된 접근입니다.
      </div>
    );
  }

  return (
    <div>
      <MobileAlert /> 
      {tabs.length === 0 ? <StartPage /> : <WritingPage />}
    </div>
  );
};

export default WritingFloatingMenu;
