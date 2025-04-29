import { create } from "zustand";

const useTabStore = create((set) => ({
  tabs: [],
  currentManuscriptId: 1,
  selectedTab: { tab_id: null, tab_no: null, id: null },

  addTab: (newTab) =>
    set((state) => {
      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        selected: false,
      }));

      updatedTabs.push({ ...newTab, selected: true });

      return {
        tabs: updatedTabs,
        selectedTab: { tab_id: newTab.tab_id, tab_no: newTab.tab_no, id: newTab.id },
      };
    }),

  setTabs: (newTabs, targetTabId = null) =>
    set(() => {
      const updatedTabs = newTabs.map((tab, index) => ({
        ...tab,
        selected: targetTabId ? tab.tab_id === targetTabId : index === 0, // targetTabId가 있으면 해당 탭을 선택, 없으면 첫 번째 탭을 선택
      }));

      // targetTabId가 있을 경우 해당 tab을 selected로 설정, 없으면 첫 번째 탭을 기본 선택
      const selectedTab = targetTabId
        ? updatedTabs.find((tab) => tab.selected) // targetTabId가 있으면 해당 탭을 선택
        : updatedTabs[0] || { tab_id: null, tab_no: null, id: null }; // 없으면 첫 번째 탭을 기본으로

      return {
        tabs: updatedTabs,
        selectedTab: { tab_id: selectedTab.tab_id, tab_no: selectedTab.tab_no, id: selectedTab.id },
        currentManuscriptId: updatedTabs.length + 1, // 탭 수 + 1로 초기화
      };
    }),





  resetTabs: () =>
    set(() => ({
      tabs: [],
      selectedTab: { tab_id: null, tab_no: null, id: null },
      currentManuscriptId: 1, // 🆕 currentManuscriptId도 초기화
    })),

  updateTab: (id, updatedFields) =>
    set((state) => {
      const updatedTabs = state.tabs.map((tab) =>
        tab.tab_id === id ? { ...tab, ...updatedFields } : tab
      );

      return { tabs: updatedTabs };
    }),

  setSelectedTab: (tabId, tabNo, id) =>
    set((state) => {
      if (tabId === null) {
        // ✅ null 값이 들어오면 selectedTab 초기화
        return { tabs: state.tabs, selectedTab: { tab_id: null, tab_no: null, id: null } };
      }

      const updatedTabs = state.tabs.map((tab) => ({
        ...tab,
        selected: tab.tab_id === tabId,
      }));

      return {
        tabs: updatedTabs,
        selectedTab: { tab_id: tabId, tab_no: tabNo, id: id },
      };
    }),

  // ✅ selectedTab을 초기화하는 전용 함수 추가
  resetSelectedTab: () =>
    set(() => ({
      selectedTab: { tab_id: null, tab_no: null, id: null },
    })),

  incrementManuscriptId: () =>
    set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })),
}));



// 세션 스토리지에 상태 저장하기
if (typeof window !== 'undefined') {
  // selectedTab 상태가 변경될 때마다 세션 스토리지에 저장
  useTabStore.subscribe(
    (state) => {
      sessionStorage.setItem("selectedTab", JSON.stringify(state.selectedTab));
    },
    (state) => state.selectedTab // selectedTab 상태를 감지하여 저장
  );

  // 세션 스토리지에서 selectedTab 불러오기
  const loadSelectedTabFromSessionStorage = () => {
    const selectedTab = sessionStorage.getItem("selectedTab");
    return selectedTab ? JSON.parse(selectedTab) : { tab_id: null, tab_no: null, id: null };
  };

  // 초기 상태 설정 (세션 스토리지에서 불러오기)
  const selectedTab = loadSelectedTabFromSessionStorage();

  // 세션 스토리지에서 불러온 selectedTab 상태 초기화
  useTabStore.setState({
    selectedTab: selectedTab,
  });
}










export default useTabStore;
