import { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../store/useAuthStore";

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // ✅ 현재 로그인된 유저 정보 가져오기
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();

    // ✅ 로그인 상태 감지 후 Zustand 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth 상태 변경:", event, session);
      setUser(session?.user || null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, [setUser]);

  return null; // UI를 렌더링하지 않는 컴포넌트
}
