
import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../supabase/supabaseClient";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      profile: null,
      hasHydrated: false,

      setUser: (user) =>
        set({
          user: {
            id: user?.id,
            email: user?.email,
          }, // ✅ 필요한 최소 정보만 저장
        }),
      setProfile: (profile) => set({ profile }),

      updateProfile: (newData) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...newData,
          },
        })),

      setHasHydrated: (bool) => set({ hasHydrated: bool }),

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      // 🔐 여기서 어떤 필드만 저장할지 명시
      partialize: (state) => ({
        user: state.user, // 위에서 이미 최소한 정보로 가공했으므로 안전
        profile: state.profile,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;