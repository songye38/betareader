// import { create } from 'zustand';

// const useStore = create((set) => ({
//   tabs: [], // 모든 탭을 관리 (원고, 설정 등)
//   currentManuscriptId: 1, // 원고 ID 관리
//   selectedTab: null, // 현재 선택된 탭
//   addTab: (newTab) => 
//     set((state) => ({
//       tabs: [...state.tabs, newTab], // 새 탭 추가 (원고, 설정 등)
//       selectedTab: newTab.id, // 방금 추가한 탭을 선택
//     })),
//   setSelectedTab: (tabId) => set({ selectedTab: tabId }), // 특정 탭을 선택
//   incrementManuscriptId: () => 
//     set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })), // 원고 ID 증가
// }));

// export default useStore;


import { create } from 'zustand';

const useTabStore = create((set) => ({
  tabs: [], // 모든 탭을 관리 (원고, 설정 등)
  currentManuscriptId: 1, // 원고 ID 관리
  selectedTab: null, // 현재 선택된 탭
  addTab: (newTab) => 
    set((state) => {
      const updatedTabs = state.tabs.map(tab => ({
        ...tab,
        selected: false, // 모든 탭의 selected를 false로 설정
      }));
      
      // 새 탭만 선택된 상태로 설정
      updatedTabs.push({ ...newTab, selected: true });

      return {
        tabs: updatedTabs, // 탭 배열 업데이트
        selectedTab: newTab.id, // 방금 추가한 탭을 선택
      };
    }),
  setSelectedTab: (tabId) => 
    set((state) => {
      const updatedTabs = state.tabs.map(tab => ({
        ...tab,
        selected: tab.id === tabId, // 선택된 탭만 selected: true로 설정
      }));

      return {
        tabs: updatedTabs,
        selectedTab: tabId,
      };
    }), // 특정 탭을 선택
  incrementManuscriptId: () => 
    set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })), // 원고 ID 증가
}));

export default useTabStore;
