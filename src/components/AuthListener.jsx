import { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../store/useAuthStore";

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (!user) {
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(user); // 기본 유저 정보 저장

      // 🔥 profile 테이블에서 추가 정보 가져오기
      const { data: profile, error } = await supabase
        .from("profile")
        .select("username")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("프로필 정보 불러오기 오류:", error);
        setProfile(null);
      } else {
        setProfile(profile);
      }
    };

    // 현재 로그인된 유저 정보 가져오기
    const getUser = async () => {
      const { data } = await supabase.auth.getUser(); // 로그인된 사용자 정보 가져오기
      await fetchUserData(data?.user);
    };
    getUser();

    // 로그인 상태 감지 및 유저 정보 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   console.log("🔄 Auth 상태 변경:", event, session);
      await fetchUserData(session?.user);
    });

    return () => listener?.subscription?.unsubscribe();
  }, [setUser, setProfile]);

  return null; // UI를 렌더링하지 않음
}
