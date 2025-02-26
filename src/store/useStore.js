import { create } from 'zustand';

const useStore = create((set) => ({
  tabs: [
    { id: 1, label: '설정집', selected: true },
    // 기본 탭에는 고유한 id를 추가합니다
  ],
  addTab: (newTab) =>
    set((state) => ({
      tabs: [
        ...state.tabs.map((tab) => ({ ...tab, selected: false })),
        { ...newTab, selected: true, id: Date.now() }, // 고유 id 생성
      ],
    })),
  setSelectedTab: (id) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id
          ? { ...tab, selected: true }
          : { ...tab, selected: false }
      ),
    })),
}));

export default useStore;
