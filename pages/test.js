import React, { useState } from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import RecentEpiSet_test from '@/components/WritingPageComponents/RecentEpiSet_test';
import MainBtnSet from '@/components/WritingPageComponents/MainBtnSet';
import AddIdeaModal from '@/components/Modal/AddIdeaModal';
import AddCharacterModal from '@/components/Modal/AddEnvironmentModal';
import AddEnvironmentModal from '@/components/Modal/AddCharacterModal';
import CharacterSet from '@/components/WritingPageComponents/CharacterSet';
import EnvironmentSet from '@/components/WritingPageComponents/EnvironmentSet';
import IdeaSlider from '@/components/WritingPageComponents/IdeaSlider';

const WritingFloatingMenu = () => {
  const [activeTitle, setActiveTitle] = useState('전체 에피소드'); // 기본 선택값
  const [isIdeaSliderOpen, setIsIdeaSliderOpen] = useState(false);

  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크'];

  return (
    <div>
        <Navbar customNavComponent={<NavMainSection />} />
        <div
            style={{
            width: 'auto',
            height: '100%',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            background: '#F0F0F0',
            borderRadius: 4,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 4,
            display: 'inline-flex',
            }}
        >
            {titles.map((title) => (
            <WritingFloatingBtn
                key={title}
                title={title}
                isActive={activeTitle === title}
                onClick={() => {
                setActiveTitle(title);
                if (title === '아이디어') {
                    setIsIdeaSliderOpen(true); // 슬라이드 열기
                } else {
                    setIsIdeaSliderOpen(false); // 그 외는 닫기
                }
            }}
          />
            ))}
        </div>



        <RecentEpiSet_test />
        <IdeaSlider isVisible={isIdeaSliderOpen} />
        <MainBtnSet />
        <CharacterSet />
        <EnvironmentSet />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <AddIdeaModal />
            <AddEnvironmentModal />
            <AddCharacterModal />
        </div>
    </div>
  );
};

export default WritingFloatingMenu;

