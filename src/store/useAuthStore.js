import { create } from "zustand";
import supabase from "../supabase/supabaseClient";

// Zustand 상태 관리
const useAuthStore = create((set) => ({
  user: null,  // user_id
  profile: null,
  manuscriptId: null,

  setUser: (user) => set({ user }),  // user_id 설정
  setProfile: (profile) => set({ profile }),  // 프로필 정보 설정
  setManuscriptId: (manuscriptId) => set({ manuscriptId }),  // manuscript_id 설정

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, manuscriptId: null });
  },
}));

export default useAuthStore;
