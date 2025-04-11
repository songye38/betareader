'use client';

import React from 'react';
import WritingFloatingBtn from '@/components/Buttons/WritingFloatingBtn';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import { FormProvider } from 'react-hook-form';
import EpisodeContentEditor from '@/components/MainPageComponents/EpisodeContentEditor';
import EpisodeTitleEditor from '@/components/MainPageComponents/EpisodeTitleEditor';
import useTabStore from '@/store/useTabStore';
import FloatingBtnSet from '@/components/MainPageComponents/FloatingBtnSet';
import useSliderStore from '@/store/useSliderStore';
import useEpisodeForm from '@/hooks/useEpisode';

const WritingPage = () => {
  const { tabs } = useTabStore();
  const selectedTab = tabs.find((tab) => tab.selected === true);

  const {
    activeTitle,
    handleSliderOpen,
  } = useSliderStore();




  const {
    methods,
    control,
    handleSubmit,
    errors,
    watch,
    isFormValid,
    onSubmit,
    setValue,
    recentEpisodes,
    fetchRecentEpisodes,
    fetchEpisodesByManuId
  } = useEpisodeForm();





  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크', '피드백'];

  console.log("selectedTab",selectedTab);

  return (
    <div>
      <Navbar
        customNavComponent={
            <NavMainSection
            onSave={async () => {
                const saved = await handleSubmit(onSubmit)();

                console.log("그래서 saves에는 무엇이?",saved);
                if (saved) {
                useTabStore.getState().updateTab(saved.tab_id, {
                    title: saved.title,
                    content: saved.content,
                    status: '임시저장됨',
                });
                }
            }}
            />
        }
        />


      <FloatingBtnSet />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* 제목 영역 */}
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
              <EpisodeTitleEditor control={control} errors={errors} title={selectedTab.title} />
            </div>

            {/* 상단 버튼 */}
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

          {/* 슬라이더 및 모달 */}
          {/* <FloatingBtnSet /> */}

          {/* 본문 에디터 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '80px' }}>
            <EpisodeContentEditor control={control} errors={errors} />
          </div>

        </form>
      </FormProvider>
    </div>
  );
};

export default WritingPage;
