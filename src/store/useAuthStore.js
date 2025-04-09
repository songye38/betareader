// import { create } from "zustand";
// import supabase from "../supabase/supabaseClient";

// // Zustand 상태 관리
// const useAuthStore = create((set) => ({
//   user: null,  // user_id
//   profile: null,

//   setUser: (user) => set({ user }),  // user_id 설정
//   setProfile: (profile) => set({ profile }),  // 프로필 정보 설정

//   logout: async () => {
//     await supabase.auth.signOut();
//     set({ user: null, profile: null });
//   },
// }));

// export default useAuthStore;


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