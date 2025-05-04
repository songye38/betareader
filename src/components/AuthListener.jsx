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
    Sentry.addBreadcrumb({
      category: 'auth',
      message: '[AuthListener] useEffect triggered',
      level: 'info',
    });

    const fetchUserData = async (session) => {
      console.log('🧩 [fetchUserData] 시작, session:', session);
      Sentry.addBreadcrumb({
        category: 'auth',
        message: '[fetchUserData] 시작',
        level: 'info',
      });

      if (!session?.user || !session?.access_token) {
        console.warn("⚠️ [fetchUserData] 유효하지 않은 세션입니다.");
        setUser(null);
        setProfile(null);
        return false;
      }

      const user = session.user;
      setUser({ id: user.id, email: user.email });

      try {
        console.log('📥 [fetchUserData] 프로필 조회 시작');

        const { data: profile, error } = await supabase
          .from("profile")
          .select("username, avatar_url")
          .eq("user_id", user.id)
          .single();

        if (error || !profile) {
          console.error("❌ [fetchUserData] 프로필 가져오기 실패:", error);
          Sentry.addBreadcrumb({
            category: 'auth',
            message: '[fetchUserData] 프로필 가져오기 실패',
            level: 'error',
          });
          Sentry.captureException(error || new Error('No profile found'), {
            contexts: { auth: { phase: "fetch profile", userId: user.id, email: user.email } },
          });
          setProfile(null);
          return false;
        }

        let signedUrl = null;
        if (profile.avatar_url) {
          console.log('🔏 [fetchUserData] Signed URL 생성 시도');
          const { data, error: urlError } = await supabase.storage
            .from("profile-image")
            .createSignedUrl(extractStoragePath(profile.avatar_url), 60 * 60 * 24 * 7);

          if (urlError) {
            console.error("❌ [fetchUserData] Signed URL 생성 실패:", urlError);
            Sentry.addBreadcrumb({
              category: 'auth',
              message: '[fetchUserData] Signed URL 생성 실패',
              level: 'error',
            });
            Sentry.captureException(urlError instanceof Error ? urlError : new Error(urlError.message || 'Unknown signed URL error'), {
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
        return true;

      } catch (error) {
        console.error("❌ [fetchUserData] 전체 실패:", error);
        Sentry.addBreadcrumb({
          category: 'auth',
          message: '[fetchUserData] 전체 실패',
          level: 'error',
        });
        Sentry.captureException(error, {
          contexts: { auth: { phase: "fetchUserData overall failure" } },
        });
        setProfile(null);
        return false;
      }
    };

    const initializeAuth = async () => {
      console.log('🚀 [initializeAuth] 호출됨');
    
      if (!supabase?.auth) {
        console.error('❌ supabase나 supabase.auth가 정의되지 않았습니다!');
        return;
      }
    
      Sentry.addBreadcrumb({
        category: 'auth',
        message: '[initializeAuth] 호출됨',
        level: 'info',
      });
    
      const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
    
      try {
        console.log('✅ supabase.auth.getSession() 호출 직전');
        
        const { data, error } = await Promise.race([
          supabase.auth.getSession(),
          timeout(5000) // 5초 안에 응답 없으면 실패 처리
        ]);
    
        console.log('✅ supabase.auth.getSession() 호출 완료');
    
        const session = data?.session;
        console.log("initializeAuth에서의 session", session);
    
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
      } catch (err) {
        console.error('🔥 [initializeAuth] 예외 발생:', err);
        Sentry.captureException(err, { contexts: { auth: { phase: "initializeAuth" } } });
      }
    };
    
    


    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('📡 [onAuthStateChange] 이벤트 발생:', event);
      Sentry.addBreadcrumb({
        category: 'auth',
        message: `[onAuthStateChange] 이벤트: ${event}`,
        level: 'info',
      });

      if (!session) {
        console.warn('⚠️ [onAuthStateChange] 세션 없음, 상태 초기화');
        setUser(null);
        setProfile(null);
        return;
      }

      await fetchUserData(session);
    });

    return () => {
      console.log('🛑 [AuthListener] 컴포넌트 언마운트 - 리스너 제거');
      Sentry.addBreadcrumb({
        category: 'auth',
        message: '[AuthListener] 컴포넌트 언마운트',
        level: 'info',
      });
      authListener?.subscription?.unsubscribe();
    };

  }, [setUser, setProfile]);

  return null;
}
