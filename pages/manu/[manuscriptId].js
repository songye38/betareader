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
import { FormProvider } from 'react-hook-form';
import ContentInput from '@/components/WritingPageComponents/ContentInput';
import useManuscriptSetting from '@/hooks/useManuscriptSetting';
import FeedbackSettingModal from '@/components/FeedbackComponents/FeedbackSettingModal';
import FeedbackSlider from '@/components/FeedbackComponents/FeedbackSlider';

const WritingFloatingMenu = () => {
  console.log('페이지 진입');
  const [activeTitle, setActiveTitle] = useState('null');
  const [activeSlider, setActiveSlider] = useState('null'); // 'idea', 'character', 'environment', 'allEpi', 'bookmark', null
  const [isAllItemSetOpen, setIsAllItemSetOpen] = useState(false); // ✅ 추가
  const [showModal, setShowModal] = useState(false);

  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    onSubmit,
    handleKeywordChange,
    loading,
    getValues,
  } = useManuscriptSetting();


  const titles = ['전체 에피소드', '아이디어', '캐릭터 카드', '세계관 노트', '북마크','피드백'];

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
      case '피드백':
        setActiveSlider('feedback');
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
      

      <div
        style={{
          paddingTop:'80px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center', // 수평 중앙 정렬
          paddingBottom:'40px',
        }}
      >
        <div
          style={{
            maxWidth: '400px', // 최대 너비 400px
            width: 'auto', // 너비가 400px보다 작으면 자동 조정
            color: 'white',
            fontSize: 27,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
            textAlign: 'center', // 텍스트 중앙 정렬
            paddingBottom: '16px', // 아래 여백 추가
          }}
        >
          제목 : 탄생 제 1화
        </div>

        <div
          style={{
            width: 'auto', // 버튼 셋의 너비가 버튼 개수에 맞게 자동으로 조정
            padding: '8px 16px',
            background: '#F0F0F0',
            borderRadius: 4,
            display: 'flex',
            gap: 4,
            justifyContent: 'center', // 버튼을 수평 중앙 정렬
            alignItems: 'center', // 버튼을 수직 중앙 정렬
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
      {showModal && (
      <FeedbackSettingModal
        selected={10}
        onSelect={(n) => setCount(n)}
        onClose={() => setShowModal(false)}
      />
    )}
      <AllItemSet isVisible={isAllItemSetOpen} onClose={closeAllSliders} />
      <IdeaSlider isVisible={activeSlider === 'idea'} onClose={closeAllSliders} />
      <CharacterSlider isVisible={activeSlider === 'character'} onClose={closeAllSliders} />
      <EnvironmentSlider isVisible={activeSlider === 'environment'} onClose={closeAllSliders} />
      <AllEpiSlider
        isVisible={activeSlider === 'allEpi'}
        onClose={closeAllSliders}
        activeTitle="프롤로그: 각성"
      />
      <FeedbackSlider isVisible={activeSlider === 'feedback'} onClose={closeAllSliders} />
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <ContentInput control={control} error={errors.title} showLabel={false} title={'캐릭터 이름'} />
          </form>
        </FormProvider>

    </div>
  );
};

export default WritingFloatingMenu;
