import { useState } from 'react';

const useSliderManager = () => {
  const [activeTitle, setActiveTitle] = useState(null);
  const [activeSlider, setActiveSlider] = useState(null);
  const [isAllItemSetOpen, setIsAllItemSetOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSliderOpen = (title) => {
    setActiveTitle(title);

    // 북마크일 경우 별도 처리
    if (title === '북마크') {
      setActiveSlider('bookmark');
      setIsAllItemSetOpen(true);
      return;
    }

    setIsAllItemSetOpen(false); // 북마크 외엔 닫기

    const sliderMap = {
      '아이디어': 'idea',
      '캐릭터 카드': 'character',
      '세계관 노트': 'environment',
      '전체 에피소드': 'allEpi',
      '피드백': 'feedback',
    };

    setActiveSlider(sliderMap[title] || null);
  };

  const closeAllSliders = () => {
    setActiveTitle(null);
    setActiveSlider(null);
    setIsAllItemSetOpen(false);
  };

  return {
    activeTitle,
    activeSlider,
    isAllItemSetOpen,
    showModal,
    setShowModal,
    handleSliderOpen,
    closeAllSliders,
  };
};

export default useSliderManager;
