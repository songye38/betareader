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
      let avatar_url = null;
      setUser({ id: user.id, email: user.email });

      try {
        console.log('📥 [fetchUserData] 프로필 조회 시작');
        const { data: profile, error } = await supabase
          .from("profile")
          .select("username, avatar_url")
          .eq("user_id", user.id)
          .single();

        console.log('📥 profile fetch result:', profile, error);  // <-- 🔥 추가

        if (error) {
          console.error("❌ [fetchUserData] 프로필 가져오기 실패:", error);
          Sentry.captureException(error, {
            contexts: {
              auth: {
                phase: "fetch profile",
                userId: user.id,
                email: user.email,
              },
            },
          });
          setProfile(null);
          return;
        }

        console.log('✅ [fetchUserData] 프로필 가져옴:', profile);

        if (profile?.avatar_url) {
          avatar_url = profile.avatar_url;
        }

        let signedUrl = null;
        if (avatar_url) {
          console.log('🔏 [fetchUserData] Signed URL 생성 시도');
          const { data, error: urlError } = await supabase.storage
            .from("profile-image")
            .createSignedUrl(extractStoragePath(avatar_url), 60 * 60 * 24 * 7);

          if (urlError) {
            console.error("❌ [fetchUserData] Signed URL 생성 실패:", urlError);
            Sentry.captureException(urlError, {
              contexts: {
                auth: {
                  phase: "create signed URL",
                  userId: user.id,
                  email: user.email,
                  avatar_url,
                },
              },
            });
          } else {
            console.log('✅ [fetchUserData] Signed URL 생성 성공:', data);
            signedUrl = data.signedUrl;
          }
        }

        setProfile({
          username: profile.username,
          avatar_url: signedUrl || null,
        });
        console.log('🎯 [fetchUserData] 최종 프로필 설정 완료');
      } catch (error) {
        console.error("❌ [fetchUserData] 전체 실패:", error);
        Sentry.captureException(error, {
          contexts: {
            auth: {
              phase: "fetchUserData overall failure",
              sessionExists: !!session,
            },
          },
        });
        setProfile(null);
      }
    };

    const getUser = async () => {
      console.log('🧩 [getUser] 호출됨');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        console.log('📡 [getUser] getSession 결과:', session, error);

        if (error) {
          console.error("❌ [getUser] 세션 가져오기 실패:", error.message);
          Sentry.captureException(error, {
            contexts: {
              auth: {
                phase: "getUser session fetch",
              },
            },
          });
          return;
        }

        if (!session) {
          console.warn("⚠️ [getUser] 세션이 없습니다. 로그인 필요.");
          return;
        }

        await fetchUserData(session);
      } catch (error) {
        console.error("❌ [getUser] 전체 실패:", error);
        Sentry.captureException(error, {
          contexts: {
            auth: {
              phase: "getUser session fetch (overall failure)",
            },
          },
        });
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('📡 [onAuthStateChange] 발생:', event, session);
        try {
          if (!session) {
            console.warn("⚠️ [onAuthStateChange] 세션 없음");
            setUser(null);
            setProfile(null);
            return;
          }
          await fetchUserData(session);
        } catch (error) {
          console.error("❌ [onAuthStateChange] 에러:", error);
          Sentry.captureException(error, {
            contexts: {
              auth: {
                phase: "onAuthStateChange",
                event,
                sessionExists: !!session,
              },
            },
          });
        }
      }
    );

    return () => {
      console.log('🛑 [AuthListener] 언마운트');
      listener?.subscription?.unsubscribe();
    };
  }, [setUser, setProfile]);

  return null;
}
