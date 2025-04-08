'use client';

import React from 'react';
import AllItemSet from '@/components/WritingPageComponents/AllItemSet';
import IdeaSlider from '@/components/WritingPageComponents/IdeaSlider';
import CharacterSlider from '@/components/WritingPageComponents/CharacterSlider';
import EnvironmentSlider from '@/components/WritingPageComponents/EnvironmentSlider';
import AllEpiSlider from '@/components/WritingPageComponents/AllEpiSlider';
import FeedbackSlider from '@/components/FeedbackComponents/FeedbackSlider';
import FeedbackSettingModal from '@/components/FeedbackComponents/FeedbackSettingModal';
import useSliderManager from '@/hooks/useSliderManager';

const FloatingBtnSet = () => {
  const {
    activeSlider,
    isAllItemSetOpen,
    showModal,
    setShowModal,
    closeAllSliders,
  } = useSliderManager();

  return (
    <>
      {showModal && (
        <FeedbackSettingModal
          selected={10}
          onSelect={(n) => console.log('selected:', n)}
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
    </>
  );
};

export default FloatingBtnSet;
