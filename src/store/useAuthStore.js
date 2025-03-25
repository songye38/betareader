// src/store/useAuthStore.js
import { create } from "zustand";
import supabase from "../supabase/supabaseClient";

const useAuthStore = create((set) => ({
  user: null, // 기본 사용자 정보
  profile: null, // 닉네임 및 프로필 이미지 정보
  setUser: (user) => set({ user }), // 사용자 정보 업데이트
  setProfile: (profile) => set({ profile }), // 프로필 정보 업데이트
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null })
  },
}));

export default useAuthStore;

