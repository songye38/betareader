'use client';

import React, { useState } from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import IdeaSlider from '@/components/WritingPageComponents/IdeaSlider';
import CharacterSlider from '@/components/WritingPageComponents/CharacterSlider';
import EnvironmentSlider from '@/components/WritingPageComponents/EnvironmentSlider';
import AllEpiSlider from '@/components/WritingPageComponents/AllEpiSlider';
import AllItemSet from '@/components/WritingPageComponents/AllItemSet';

const WritingFloatingMenu = () => {
  const [activeTitle, setActiveTitle] = useState('전체 에피소드');
  const [activeSlider, setActiveSlider] = useState('allEpi'); // 'idea', 'character', 'environment', 'allEpi', 'bookmark', null
  const [isAllItemSetOpen, setIsAllItemSetOpen] = useState(false); // ✅ 추가

  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크'];

  const handleSliderOpen = (title) => {
    setActiveTitle(title);

    // 북마크인 경우 AllItemSet 오픈
    if (title === '북마크') {
      setActiveSlider('bookmark');
      setIsAllItemSetOpen(true);
      return;
    }

    setIsAllItemSetOpen(false); // 북마크 외 탭 클릭 시 닫기

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
    setActiveTitle(null);
    setIsAllItemSetOpen(false); // ✅ 슬라이더 닫힐 때 AllItemSet도 닫기
  };

  return (
    <div>
      <Navbar customNavComponent={<NavMainSection />} />

      {/* 플로팅 버튼 메뉴 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div
          style={{
            padding: '8px 16px',
            background: '#F0F0F0',
            borderRadius: 4,
            display: 'flex',
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
      </div>

      {/* 슬라이더 컴포넌트들 */}
      <AllItemSet isVisible={isAllItemSetOpen} onClose={closeAllSliders} />
      <IdeaSlider isVisible={activeSlider === 'idea'} onClose={closeAllSliders} />
      <CharacterSlider isVisible={activeSlider === 'character'} onClose={closeAllSliders} />
      <EnvironmentSlider isVisible={activeSlider === 'environment'} onClose={closeAllSliders} />
      <AllEpiSlider
        isVisible={activeSlider === 'allEpi'}
        onClose={closeAllSliders}
        activeTitle="프롤로그: 각성"
      />
    </div>
  );
};

export default WritingFloatingMenu;
