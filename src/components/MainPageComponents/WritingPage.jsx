'use client';

import React from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import useManuscriptSetting from '@/hooks/useManuscriptSetting';
import { FormProvider } from 'react-hook-form';
import EpisodeContentEditor from '@/components/MainPageComponents/EpisodeContentEditor';
import EpisodeTitleEditor from '@/components/MainPageComponents/EpisodeTitleEditor';
import useTabStore from '@/store/useTabStore';
import FloatingBtnSet from '@/components/MainPageComponents/FloatingBtnSet';
import useSliderStore from '@/store/useSliderStore'; // ✅ zustand store로 변경

const WritingPage = () => {
  const { tabs } = useTabStore();
  const selectedTab = tabs.find((tab) => tab.selected === true);

  const {
    activeTitle,
    handleSliderOpen,
  } = useSliderStore(); // ✅ useSliderManager 대신 zustand store 사용

  const {
    methods,
    control,
    errors,
    handleSubmit,
    onSubmit,
  } = useManuscriptSetting();

  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크', '피드백'];

  return (
    <div>
      <Navbar customNavComponent={<NavMainSection />} />

      <div
        style={{
          paddingTop: '80px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '40px',
        }}
      >
        <div
          style={{
            width: '600px',
            color: 'white',
            fontSize: 27,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
            textAlign: 'center',
            paddingBottom: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <EpisodeTitleEditor control={control} errors={errors} title={selectedTab.title} />
            </form>
          </FormProvider>
        </div>

        <div
          style={{
            padding: '8px 16px',
            background: '#F0F0F0',
            borderRadius: 4,
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
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

      {/* ✅ zustand 기반 슬라이더 및 모달 컴포넌트 */}
      <FloatingBtnSet />

      {/* 에피소드 에디터 */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
        >
          <EpisodeContentEditor control={control} errors={errors} />
        </form>
      </FormProvider>
    </div>
  );
};

export default WritingPage;
