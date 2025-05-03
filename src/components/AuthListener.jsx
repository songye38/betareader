import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../store/useAuthStore";

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  function extractStoragePath(fullUrl) {
    const baseUrl = "https://aypubingbgvofmsrbrut.supabase.co/storage/v1/object/public/profile-image/";
    if (!fullUrl.startsWith(baseUrl)) {
      console.warn("⚠️ 예상된 base URL이 아닙니다. 반환값은 원본입니다.");
      return fullUrl;
    }
    return fullUrl.replace(baseUrl, "");
  }

  useEffect(() => {
    console.log('🌀 [AuthListener] useEffect triggered');

    const fetchUserData = async (session) => {
      console.log('🧩 [fetchUserData] 시작, session:', session);

      if (!session?.user || !session?.access_token) {
        console.warn("⚠️ [fetchUserData] 유효하지 않은 세션입니다.");
        setUser(null);
        setProfile(null);
        return;
      }

      const user = session.user;
      setUser({ id: user.id, email: user.email });

      try {
        console.log('📥 [fetchUserData] 프로필 조회 시작');

        const { data: profile, error } = await supabase
          .from("profile")
          .select("username, avatar_url, user_id")
          .eq("user_id", user.id)
          .single();

        if (error || !profile) {
          console.error("❌ [fetchUserData] 프로필 가져오기 실패:", error);
          Sentry.captureException(error || new Error('No profile found'), {
            contexts: { auth: { phase: "fetch profile", userId: user.id, email: user.email } },
          });
          setProfile(null);
          return;
        }

        if (profile.user_id !== user.id) {
          console.warn("⚠️ [fetchUserData] 세션의 user.id와 프로필의 user_id 불일치");
          return;
        }

        let signedUrl = null;
        if (profile.avatar_url) {
          console.log('🔏 [fetchUserData] Signed URL 생성 시도');
          const { data, error: urlError } = await supabase.storage
            .from("profile-image")
            .createSignedUrl(extractStoragePath(profile.avatar_url), 60 * 60 * 24 * 7); // 7일

          if (urlError) {
            console.error("❌ [fetchUserData] Signed URL 생성 실패:", urlError);
            Sentry.captureException(urlError, {
              contexts: { auth: { phase: "create signed URL", userId: user.id, email: user.email } },
            });
          } else {
            signedUrl = data?.signedUrl || null;
          }
        }

        setProfile({
          username: profile.username,
          avatar_url: signedUrl,
        });

        console.log('🎯 [fetchUserData] 최종 프로필 설정 완료');

      } catch (error) {
        console.error("❌ [fetchUserData] 전체 실패:", error);
        Sentry.captureException(error, {
          contexts: { auth: { phase: "fetchUserData overall failure" } },
        });
        setProfile(null);
      }
    };

    const initializeAuth = async () => {
      console.log('🚀 [initializeAuth] 호출됨');

      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error) {
        console.error('❌ [initializeAuth] getSession 실패:', error);
        Sentry.captureException(error, { contexts: { auth: { phase: "initial getSession" } } });
        return;
      }

      if (session) {
        console.log('✅ [initializeAuth] 초기 세션 발견, fetchUserData 실행');
        await fetchUserData(session);
      } else {
        console.warn('⚠️ [initializeAuth] 초기 세션 없음, auth 이벤트 대기');
      }
    };

    // 초기 세션 가져오기
    initializeAuth();

    // 인증 상태 변경 리스너 등록
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('📡 [onAuthStateChange] 이벤트 발생:', event);

      if (event === "INITIAL_SESSION") {
        console.log('🆗 [onAuthStateChange] 초기 세션 감지');
      }

      if (!session) {
        console.warn('⚠️ [onAuthStateChange] 세션 없음, 상태 초기화');
        setUser(null);
        setProfile(null);
        return;
      }

      await fetchUserData(session);
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      console.log('🛑 [AuthListener] 컴포넌트 언마운트 - 리스너 제거');
      authListener?.subscription?.unsubscribe();
    };

  }, [setUser, setProfile]);

  return null;
}
