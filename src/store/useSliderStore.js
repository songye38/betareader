import { create } from 'zustand';

const useSliderStore = create((set) => ({
  activeTitle: null,
  activeSlider: null,
  isAllItemSetOpen: false,
  showModal: false,

  handleSliderOpen: (title) => {
    const sliderMap = {
      '아이디어': 'idea',
      '캐릭터 카드': 'character',
      '세계관 노트': 'environment',
      '전체 에피소드': 'allEpi',
      '피드백': 'feedback',
      '북마크': 'bookmark',
    };

    set({
      activeTitle: title,
      activeSlider: sliderMap[title] || null,
      isAllItemSetOpen: title === '북마크',
    });
  },

  closeAllSliders: () => {
    set({
      activeTitle: null,
      activeSlider: null,
      isAllItemSetOpen: false,
    });
  },

  setShowModal: (value) => {
    set({ showModal: value });
  },
}));

export default useSliderStore;
