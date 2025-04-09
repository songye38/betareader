import { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../store/useAuthStore";

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  useEffect(() => {
    const fetchUserData = async (session) => {
      if (!session?.user) {
        setUser(null);
        setProfile(null);
        return;
      }


      console.log("session.user.id",session.user.id);
      

      // 최소한의 정보만 저장 (persist로 저장됨)
      const user = session.user;
      setUser({ id: user.id, email: user.email });

      // Supabase에서 추가 정보(profile) 가져오기
      const { data: profile, error } = await supabase
        .from("profile") // 테이블명 꼭 확인!
        .select("username")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("❌ 프로필 가져오기 실패:", error);
        setProfile(null);
      } else {
        console.log("✅ 프로필 가져오기 성공:", profile);
        setProfile(profile);
      }
    };

    // 1. 최초 유저 가져오기
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("그래서 session은",session);
      await fetchUserData(session);
    };
    getUser();

    // 2. auth 상태 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("📢 Auth 이벤트:", event);
    console.log("📦 전달된 세션:", session);
        await fetchUserData(session);
      }
    );

    // 🧼 정리 (언마운트 시 구독 해제)
    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [setUser, setProfile]);

  return null;
}
