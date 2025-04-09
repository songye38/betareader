'use client';

import React from 'react';
import StartPage from '@/components/MainPageComponents/StartPage';
import WritingPage from '@/components/MainPageComponents/WritingPage';
import useTabStore from '@/store/useTabStore';

const WritingFloatingMenu = () => {
  const { tabs } = useTabStore();

  return (
    <div>
      {tabs.length === 0 ? <StartPage /> : <WritingPage />}
    </div>
  );
};

export default WritingFloatingMenu;
