'use client';

import React, { useState } from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import IdeaSlider from '@/components/WritingPageComponents/IdeaSlider';
import CharacterSlider from '@/components/WritingPageComponents/CharacterSlider';
import EnvironmentSlider from '@/components/WritingPageComponents/EnvironmentSlider';
import AllEpiSlider from '@/components/WritingPageComponents/AllEpiSlider';

const WritingFloatingMenu = () => {
  const [activeTitle, setActiveTitle] = useState('전체 에피소드');
  const [activeSlider, setActiveSlider] = useState('allEpi'); // 'idea', 'character', 'environment', 'allEpi', null

  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크'];

  const handleSliderOpen = (title) => {
    setActiveTitle(title);
    switch (title) {
      case '아이디어':
        setActiveSlider('idea');
        break;
      case '캐릭터 카드':
        setActiveSlider('character');
        break;
      case '세계관 노트':
        setActiveSlider('environment');
        break;
      case '전체 에피소드':
        setActiveSlider('allEpi');
        break;
      default:
        setActiveSlider(null);
    }
  };

  const closeAllSliders = () => {
    setActiveSlider(null);
  };

  return (
    <div>
      <Navbar customNavComponent={<NavMainSection />} />

      {/* 플로팅 버튼 메뉴 */}
      <div
        style={{
          width: 'auto',
          padding: '8px 16px',
          background: '#F0F0F0',
          borderRadius: 4,
          display: 'inline-flex',
          gap: 4,
        }}
      >
        {titles.map((title) => (
          <WritingFloatingBtn
            key={title}
            title={title}
            isActive={activeTitle === title}
            onClick={() => handleSliderOpen(title)}
          />
        ))}
      </div>

      {/* 슬라이더들 */}
      <IdeaSlider isVisible={activeSlider === 'idea'} onClose={closeAllSliders} />
      <CharacterSlider isVisible={activeSlider === 'character'} onClose={closeAllSliders} />
      <EnvironmentSlider isVisible={activeSlider === 'environment'} onClose={closeAllSliders} />
      <AllEpiSlider isVisible={activeSlider === 'allEpi'} onClose={closeAllSliders} />
    </div>
  );
};

export default WritingFloatingMenu;
