import { create } from 'zustand';

const useStore = create((set) => ({
  tabs: [], // 초기 탭 목록
  selectedTab: null, // 현재 선택된 탭 ID
  currentManuscriptId: 1, // 원고 ID 초기값
  isSettingCreated: false, // 설정집이 만들어졌는지 여부
  isSettingTabClicked: false, // SettingTab 클릭 여부
  selectedItemType : null,

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

    // 설정집이 없었다가(false) -> 있는걸로 바뀜(true)
  setIsSettingCreated: () =>
    set((state) => ({
      isSettingCreated: true, // isSettingCreated를 true로만 설정
    })),

    setIsSettingTabClicked: (status) =>
    set((state) => ({
      isSettingTabClicked: status,
      selectedTab: null, // SettingTab 클릭 시 selectedTab을 null로 설정
      tabs: state.tabs.map((tab) => ({ ...tab, selected: false })), // 모든 탭 선택 해제
    })),

    setSelectedItemType: (type) =>
      set(() => ({
        selectedItemType: type, // 'episode' 또는 'setting' 등의 값으로 설정
      })),
}));

export default useStore;
