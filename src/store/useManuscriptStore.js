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

  // 원고 설정
  episodes: null,
  setEpisodes: (data) => set({ episodes: data }),

  // 설정 관련
  setting: null,
  setSetting: (setting) => set({ setting: setting }),
}));

export default useManuscriptStore;







// 일부만 업데이트
// const newId = 'new-manuscript-id';
// useManuscriptStore.getState().setManuscript({ id: newId });

// import { create } from "zustand";

// const useManuscriptStore = create((set) => ({

//   //원고집 설정
//   manuscript: null, 
//   setManuscript: (data) => set({ manuscript: data }), 
//   clearManuscript: () => set({ manuscript: null }),

//   manuscriptId: null,
//   setManuscriptId: (id) => set({ manuscriptId: id }),  // manuscriptId 상태 추가

//   //원고 설정
//   episodes: null, 
//   setEpisodes: (data) => set({ episodes: data }), 

//   //설정 관련 
//   setting : null,
//   setSetting: (setting) => set({ setting: data }), 



// }));

// export default useManuscriptStore;
