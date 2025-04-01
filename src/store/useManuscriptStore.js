import { create } from "zustand";

const useManuscriptStore = create((set) => ({

  //원고집 설정
  manuscript: null, 
  setManuscript: (data) => set({ manuscript: data }), 
  clearManuscript: () => set({ manuscript: null }),

  //원고 설정
  episodes: null, 
  setEpisodes: (data) => set({ episodes: data }), 

  //설정 관련 
  setting : null,
  setSetting: (setting) => set({ setting: data }), 



}));

export default useManuscriptStore;
