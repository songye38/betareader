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
import useAuthStore from '@/store/useAuthStore';
import { useEffect,useState } from 'react';
import useManuscriptStore from '@/store/useManuscriptStore';

const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크', '피드백'];

const WritingPage = () => {
  const { manuscript } = useManuscriptStore();
  const { tabs } = useTabStore();
  const selectedTab = tabs.find((tab) => tab.selected === true);
  const { activeTitle, handleSliderOpen } = useSliderStore();
  const { user } = useAuthStore();
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);

  const {
    methods,
    control,
    handleSubmit,
    errors,
    onSubmit,
    fetchEpisodesByManuId,
  } = useEpisodeForm();

  useEffect(() => {
    if (!user || !user.id || !manuscript || !manuscript.id) {
      console.log("이런 상황인가?");
      return;
    }
    console.log("정보들은 다 있는건가/");
    fetchEpisodesByManuId(user.id, manuscript.id);
    console.log("selectedTab", selectedTab);
  }, [user?.id]);

  useEffect(() => {
    if (selectedTab) {
      methods.reset({
        title: selectedTab.title || '',
        content: selectedTab.content || '',
      });
    }
  }, [selectedTab]);

  const handleTitleChange = () => {
    console.log('타이틀 변경 감지!');
    setIsTitleChanged(true);
  };

  const handleContentChange = () => {
    console.log('내용 변경 감지!');
    setIsContentChanged(true);
  };




  // TODO 에피소드 아이디를 NavMainSection에 prop으로 넘겨줘야 함

  return (
    <div style={{ position: 'relative' }}>
      <Navbar
        customNavComponent={
          <NavMainSection
            isTitleChanged={isTitleChanged}
            setIsTitleChanged={setIsTitleChanged}
            isContentChanged = {isContentChanged}
            setIsContentChanged={setIsContentChanged}
            tabId={selectedTab?.tab_id}
            is_feedback_mode={selectedTab?.is_feedback_mode}
            episodeId={selectedTab?.id}
            userId={user?.id}
            onSave={handleSubmit((formData) => onSubmit(formData, manuscript.id))} // 더 이상 async/await 필요 없음
          />
        }
      />

      <FloatingBtnSet />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData, manuscript.id))}>

          {/* 제목 영역 */}
          <div
            style={{
              paddingTop: '80px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              paddingBottom: '40px',
              paddingRight: '100px',
              paddingLeft: '100px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '100%',
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
              <EpisodeTitleEditor
                control={control}
                errors={errors}
                title={selectedTab?.title || ''}
                disabled={selectedTab?.is_feedback_mode === true}
                onTitleChange={handleTitleChange}
              />
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
              {/* 메뉴바 */}
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

          {/* 본문 에디터 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '80px' }}>
            <EpisodeContentEditor
              control={control}
              errors={errors}
              disabled={selectedTab?.is_feedback_mode === true}
              onContentChange={handleContentChange}
            />
          </div>
        </form>
      </FormProvider>

      {/* ✅ 슬라이더 활성화 시 dim 처리 */}
      {activeTitle && (
        <div
          onClick={() => handleSliderOpen('')} // 배경 클릭 시 슬라이더 닫기
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 10,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </div>
  );
};

export default WritingPage;
