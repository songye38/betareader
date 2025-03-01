import { create } from 'zustand';

const useStore = create((set) => ({
  tabs: [], // 초기 탭 목록
  selectedTab: null, // 현재 선택된 탭 ID
  currentManuscriptId: 1, // 원고 ID 초기값

  // 새 탭 추가 함수
  addTab: (newTab) =>
    set((state) => ({
      tabs: [
        ...state.tabs.map((tab) => ({ ...tab, selected: false })), // 기존 탭 선택 해제
        { ...newTab, selected: true }, // 새 탭 추가 및 선택
      ],
    })),

  // 선택된 탭 변경 함수
  setSelectedTab: (id) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id
          ? { ...tab, selected: true }
          : { ...tab, selected: false }
      ),
      selectedTab: id, // 선택된 탭 ID 업데이트
    })),

  // 원고 ID 증가 함수
  incrementManuscriptId: () =>
    set((state) => ({
      currentManuscriptId: state.currentManuscriptId + 1,
    })),
}));

export default useStore;
