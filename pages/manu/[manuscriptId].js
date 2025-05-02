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
  const { user } = useAuthStore(); // user 상태 가져오기
  const [hasAccess, setHasAccess] = useState(true); // ✅ 접근 권한 상태 추가
  const { fetchEpisodesByManuId } = useEpisodeForm();

  const handleClick = async (tab_id, manuId) => {
    console.log("함수가 호출되는가?");
    console.log("user id는?", user.id);
    // user.id가 null인 경우 handleClick 함수 실행하지 않도록 조건 추가
    if (!user?.id) {
      console.warn("⚠️ user.id가 없어서 handleClick이 실행되지 않습니다.");
      return;
    }
    if (!(manuId && tab_id)) {
      console.error('필수 파라미터가 부족합니다.', { userId: user.id, manuId, tabId });
      return;
    }

    const episodes = await fetchEpisodesByManuId(user.id, manuId);
    resetTabs();
    setTabs(episodes, tab_id);
    console.log("episodes에 내용이 채워지는가?", episodes);

    const selectedTab = useTabStore.getState().selectedTab;
    if (selectedTab?.is_feedback_mode) {
      setActiveSlider('feedback');
    }

    if (selectedTab.tab_id) {
      router.push(`/manu/${manuId}?tab=${selectedTab.tab_id}`);
    } else {
      console.error('selectedTab.tab_id is missing');
    }
  };


  // ✅ auth-storage 확인해서 접근권한 체크하기 위한 용도
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStorageStr = localStorage.getItem('auth-storage');

      if (authStorageStr) {
        try {
          const authStorage = JSON.parse(authStorageStr);

          // user가 null이면 접근 권한이 없다고 판단
          if (authStorage?.state?.user === null) {
            console.warn('⚠️ user가 null이라서 접근 권한이 없습니다.');
            setHasAccess(false); // 접근권한 없으면 false
          }
        } catch (err) {
          console.error('❌ auth-storage 파싱 실패:', err);
        }
      } else {
        console.warn('⚠️ auth-storage가 존재하지 않음');
        setHasAccess(false); // auth-storage가 없으면 접근 권한 없음
      }
    }
  }, []);

  useEffect(() => {
    console.log("📦 페이지가 새롭게 렌더링됨");
    // 페이지가 처음 로드될 때 바로 로컬 스토리지에서 manuscript와 selectedTab 정보를 가져오기
    try {
      const manuscriptStr = localStorage.getItem('manuscript');
      const selectedTabStr = localStorage.getItem('selectedTab');

      if (manuscriptStr && selectedTabStr) {
        const manuscript = JSON.parse(manuscriptStr);
        const selectedTab = JSON.parse(selectedTabStr);

        console.log("📦 로컬 스토리지에서 불러온 manuscript:", manuscript);
        console.log("📦 로컬 스토리지에서 불러온 selectedTab:", selectedTab);

        if (manuscript?.id && selectedTab?.tab_id) {
          handleClick(selectedTab.tab_id, manuscript.id);
        }
      } else {
        console.warn("⚠️ 로컬 스토리지에 manuscript나 selectedTab이 없음");
      }
    } catch (err) {
      console.error("❌ 로컬 스토리지 파싱 실패:", err);
    }
  }, []); // 의존성 배열을 빈 배열로 설정하여 페이지 로드 시 한 번만 실행되도록 설정

  // ✅ 렌더링
  if (!hasAccess) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: 'white' }}>
        잘못된 접근입니다.
      </div>
    );
  }

  return (
    <div>
      {tabs.length === 0 ? <StartPage /> : <WritingPage />}
    </div>
  );
};

export default WritingFloatingMenu;
