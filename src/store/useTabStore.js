import { create } from "zustand";

const useTabStore = create((set) => ({
  tabs: [],
  currentManuscriptId: 1,
  selectedTab: { id: null, no: null },

  addTab: (newTab) =>
    set((state) => {
      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        selected: false,
      }));

      updatedTabs.push({ ...newTab, selected: true });

      return {
        tabs: updatedTabs,
        selectedTab: { id: newTab.id, no: newTab.no },
      };
    }),

    resetTabs: () =>
      set(() => ({
        tabs: [],
        selectedTab: { id: null, no: null },
        currentManuscriptId: 1, // 🆕 currentManuscriptId도 초기화
      })),

  setSelectedTab: (tabId, tabNo) =>
    set((state) => {
      if (tabId === null) {
        // ✅ null 값이 들어오면 selectedTab 초기화
        return { tabs: state.tabs, selectedTab: { id: null, no: null } };
      }

      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        selected: tab.id === tabId,
      }));

      return {
        tabs: updatedTabs,
        selectedTab: { id: tabId, no: tabNo },
      };
    }),

  // ✅ selectedTab을 초기화하는 전용 함수 추가
  resetSelectedTab: () =>
    set(() => ({
      selectedTab: { id: null, no: null },
    })),

  incrementManuscriptId: () =>
    set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })),
}));

export default useTabStore;
