import { create } from 'zustand';

const useSliderStore = create((set) => ({
  activeTitle: null,
  activeSlider: null,  // 현재 활성화된 슬라이더
  isAllItemSetOpen: false,
  showModal: false, // 기존 모달 상태

  // 슬라이더를 열 때 호출되는 함수
  handleSliderOpen: (title) => {
    const sliderMap = {
      '아이디어': 'idea',
      '캐릭터 카드': 'character',
      '세계관 노트': 'environment',
      '전체 에피소드': 'allEpi',
      '피드백': 'feedback', // 피드백 슬라이더 활성화
      '북마크': 'bookmark',
    };

    set({
      activeTitle: title,
      activeSlider: sliderMap[title] || null, // 활성화된 슬라이더 설정
      isAllItemSetOpen: title === '북마크', // 북마크 상태 처리
    });
  },

  // 모든 슬라이더를 닫는 함수
  closeAllSliders: () => {
    set({
      activeTitle: null,
      activeSlider: null, // 모든 슬라이더 비활성화
      isAllItemSetOpen: false,
    });
  },

  // showModal 상태 설정 함수 (기존대로)
  setShowModal: (value) => {
    set({ showModal: value });
  },

  // activeSlider 상태를 설정하는 함수
  setActiveSlider: (slider) => {
    set({ activeSlider: slider }); // 특정 슬라이더를 활성화
  },
}));

export default useSliderStore;
