import { create } from "zustand";

const useTabStore = create((set) => ({
  tabs: [],
  currentManuscriptId: 1,
  selectedTab: { tab_id: null, tab_no: null },

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

  setTabs: (newTabs) =>
    set(() => {
      const updatedTabs = newTabs.map((tab, index) => ({
        ...tab,
        selected: index === 0, // 첫 번째 탭 선택
      }));
  
      const firstTab = updatedTabs[0] || { tab_id: null, tab_no: null };
  
      return {
        tabs: updatedTabs,
        selectedTab: { tab_id: firstTab.id, tab_no: firstTab.no },
        currentManuscriptId: updatedTabs.length + 1, // 탭 수 + 1로 초기화
      };
    }),
    
    

  resetTabs: () =>
    set(() => ({
      tabs: [],
      selectedTab: { id: null, no: null },
      currentManuscriptId: 1, // 🆕 currentManuscriptId도 초기화
    })),

  updateTab: (id, updatedFields) =>
    set((state) => {
      const updatedTabs = state.tabs.map((tab) =>
        tab.tab_id === id ? { ...tab, ...updatedFields } : tab
      );
  
      return { tabs: updatedTabs };
    }),

  setSelectedTab: (tabId, tabNo) =>
    set((state) => {
      if (tabId === null) {
        // ✅ null 값이 들어오면 selectedTab 초기화
        return { tabs: state.tabs, selectedTab: { tab_id: null, tab_no: null } };
      }

      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        selected: tab.tab_id === tabId,
      }));

      return {
        tabs: updatedTabs,
        selectedTab: { tab_id: tabId, tab_no: tabNo },
      };
    }),

  // ✅ selectedTab을 초기화하는 전용 함수 추가
  resetSelectedTab: () =>
    set(() => ({
      selectedTab: { tab_id: null, tab_no: null },
    })),

  incrementManuscriptId: () =>
    set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })),
}));

export default useTabStore;
