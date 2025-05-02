import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs"; // ✅ 추가
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
    const fetchUserData = async (session) => {
      if (!session?.user) {
        setUser(null);
        setProfile(null);
        return;
      }

      const user = session.user;
      let avatar_url = null;
      setUser({ id: user.id, email: user.email });

      try {
        const { data: profile, error } = await supabase
          .from("profile")
          .select("username, avatar_url")
          .eq("user_id", session.user.id)
          .single();

        if (error) {
          console.error("❌ 프로필 가져오기 실패:", error);
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

        if (profile) {
          avatar_url = profile.avatar_url;
        }

        let signedUrl = null;
        if (avatar_url) {
          const { data, error: urlError } = await supabase.storage
            .from("profile-image")
            .createSignedUrl(extractStoragePath(avatar_url), 60 * 60 * 24 * 7);

          if (urlError) {
            console.error("❌ Signed URL 생성 실패:", urlError);
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
            signedUrl = data.signedUrl;
          }
        }

        setProfile({
          username: profile.username,
          avatar_url: signedUrl || null,
        });
      } catch (error) {
        console.error("❌ fetchUserData 전체 실패:", error);
        Sentry.captureException(error, {
          contexts: {
            auth: {
              phase: "fetchUserData overall failure",
              sessionExists: !!session,
            },
          },
        });
      }
    };

    // const getUser = async () => {
    //   try {
    //     const { data: { session } } = await supabase.auth.getSession();
    //     await fetchUserData(session);
    //   } catch (error) {
    //     console.error("❌ getUser 실패:", error);
    //     Sentry.captureException(error, {
    //       contexts: {
    //         auth: {
    //           phase: "getUser session fetch",
    //         },
    //       },
    //     });
    //   }
    // };
    const getUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
    
        if (error) {
          console.error("❌ 세션 가져오기 실패:", error.message);
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
          console.warn("⚠️ 세션이 없습니다. 로그인 필요.");
          // 필요하면 여기서 로그인 페이지로 이동하거나 처리할 수 있음
          return;
        }
    
        await fetchUserData(session);
      } catch (error) {
        console.error("❌ getUser 실패:", error);
        Sentry.captureException(error, {
          contexts: {
            auth: {
              phase: "getUser session fetch",
            },
          },
        });
      }
    };
    

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await fetchUserData(session);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [setUser, setProfile]);

  return null;
}
