import { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";

export default function AuthListener() {
  const setUser = useAuthStore((state) => state.setUser);
  const setProfile = useAuthStore((state) => state.setProfile);

  function extractStoragePath(fullUrl) {
    const baseUrl = "https://aypubingbgvofmsrbrut.supabase.co/storage/v1/object/public/profile-image/";
  
    if (!fullUrl.startsWith(baseUrl)) {
      console.warn("⚠️ 예상된 base URL이 아닙니다. 반환값은 원본입니다.");
      return fullUrl; // or return null; 원하는 방식으로 처리 가능
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

      // 1. 기본 프로필 정보 가져오기
      const { data: profile, error } = await supabase
        .from("profile")
        .select("username, avatar_url") // avatar_url → 사실은 storage 경로
        .eq("user_id", session.user.id)
        .select()
        .single();

        if(profile){
          avatar_url = profile.avatar_url
          console.log()
        }
      
      if (error) {
        console.error("❌ 프로필 가져오기 실패:", error);
        setProfile(null);
        return;
      }

      

      // 2. signed URL 생성
      let signedUrl = null;
      if (avatar_url) {
        const { data, error: urlError } = await supabase.storage
          .from("profile-image")
          .createSignedUrl(extractStoragePath(avatar_url), 60 * 60 * 24 * 7); // 7일 유효

        if (urlError) {
          console.error("❌ Signed URL 생성 실패:", urlError);
        } else {
          signedUrl = data.signedUrl;
        }
      }

      // 3. 상태 저장: avatar_url 대신 signedUrl을 저장해도 되고, 따로 분리해서도 저장 가능
      setProfile({
        username: profile.username,
        avatar_url: signedUrl || null,
      });
    };

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await fetchUserData(session);
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
