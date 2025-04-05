import React, { useState } from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';

const WritingFloatingMenu = () => {
  const [activeTitle, setActiveTitle] = useState('전체 에피소드'); // 기본 선택값

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
                onClick={() => setActiveTitle(title)}
            />
            ))}
        </div>
    </div>
  );
};

export default WritingFloatingMenu;

