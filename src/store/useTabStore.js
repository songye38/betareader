import { create } from 'zustand';

const useTabStore = create((set) => ({
  tabs: [], // 모든 탭을 관리 (원고, 설정 등)
  currentManuscriptId: 1, // 원고 ID 관리
  
  // 현재 선택된 탭 여기에 고유 id와 no를 함께 저장 selectedTab: null, // 현재 선택된 탭 여기에 고유 id와 no를 함께 저장
  selectedTab: { id: null, no: null },
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
        selectedTab: { id: newTab.id, no: newTab.no }, // id와 no 동시 저장
      };
    }),
  setSelectedTab: (tabId, tabNo) => 
    set((state) => {
      const updatedTabs = state.tabs.map(tab => ({
        ...tab,
        selected: tab.id === tabId, // 선택된 탭만 selected: true로 설정
      }));

      return {
        tabs: updatedTabs,
        selectedTab: { id: tabId, no: tabNo }, // id와 no 동시 저장
      };
    }), // 특정 탭을 선택
  incrementManuscriptId: () => 
    set((state) => ({ currentManuscriptId: state.currentManuscriptId + 1 })), // 원고 ID 증가
}));

export default useTabStore;
