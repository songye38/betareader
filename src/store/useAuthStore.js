// src/store/useAuthStore.js
import { create } from "zustand";
import supabase from "../supabase/supabaseClient";

const useAuthStore = create((set) => ({
  user: null, // 현재 로그인한 유저 정보
  setUser: (user) => set({ user }), // 유저 정보 업데이트
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;