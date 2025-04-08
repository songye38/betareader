'use client';

import React from 'react';
import StartPage from '@/components/MainPageComponents/StartPage';
import WritingPage from '@/components/MainPageComponents/WritingPage';
import useTabStore from '@/store/useTabStore';

const WritingFloatingMenu = () => {
  const { tabs } = useTabStore();

  return (
    <div>
      페이지를 그리자
      {tabs.length === 0 ? <StartPage /> : <WritingPage />}
    </div>
  );
};

export default WritingFloatingMenu;
