import { create } from 'zustand';

const useStore = create((set) => ({
  tabs: [
    { label: '설정집', selected: false },
    { label: '1화', selected: true },
  ],
  addTab: (newTab) =>
    set((state) => ({
      tabs: state.tabs.map((tab) => ({
        ...tab,
        selected: false, // 기존 탭들의 selected를 모두 false로 설정
      })).concat({ ...newTab, selected: true }), // 새 탭을 추가하면서 `selected: true`로 설정
    })),
}));

export default useStore;
