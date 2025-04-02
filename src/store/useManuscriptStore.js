import { create } from "zustand";

const useManuscriptStore = create((set) => ({
  manuscript: {
    episode_count: null,
    id: null,
    isSetup: false,
    last_edited_at: null,
    title: '',
    user_id: null,
  },

  // 전체 manuscript 객체를 업데이트하는 함수
  setManuscript: (data) => set({
    manuscript: data,
  }),

  allEpisodes : [],

  // 원고 설정
  episode: {
    manuscript_id : null,
    type : null,
    content : null,
    create_at : null,
    last_edited_at : null,
    title : null,
    tab_id : null,
    tab_no : null,
  },
  setEpisode: (data) => set({ episodes: data }),

  // 설정 관련
  setting: null,
  setSetting: (setting) => set({ setting: setting }),
}));

// 세션 스토리지에 상태 저장하기
if (typeof window !== 'undefined') {
  useManuscriptStore.subscribe((state) => {
    sessionStorage.setItem("manuscript", JSON.stringify(state.manuscript));
    sessionStorage.setItem("episode", JSON.stringify(state.episode));
    sessionStorage.setItem("setting", JSON.stringify(state.setting));
  }, (state) => state.manuscript);  // manuscript 상태가 변경될 때마다 실행

  // 세션 스토리지에서 상태 불러오기
  const loadFromSessionStorage = () => {
    const manuscript = sessionStorage.getItem("manuscript");
    const episode = sessionStorage.getItem("episode");
    const setting = sessionStorage.getItem("setting");

    return {
      manuscript: manuscript ? JSON.parse(manuscript) : null,
      episode: episode ? JSON.parse(episode) : null,
      setting: setting ? JSON.parse(setting) : null,
    };
  };

  // 초기 상태 설정 (세션 스토리지에서 불러오기)
  const { manuscript, episode, setting } = loadFromSessionStorage();

  useManuscriptStore.setState({
    manuscript: manuscript || {
      episode_count: null,
      id: null,
      isSetup: false,
      last_edited_at: null,
      title: '',
      user_id: null,
    },
    episode: episode || {
      manuscript_id: null,
      type: null,
      content: null,
      create_at: null,
      last_edited_at: null,
      title: null,
      tab_id: null,
      tab_no: null,
    },
    setting: setting || null,
  });
}

export default useManuscriptStore;
