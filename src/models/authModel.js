import supabase from '../supabase/supabaseClient';
import * as Sentry from '@sentry/react'; // 1. Sentry import 추가

// 일반 이메일 로그인
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  } catch (error) {
    Sentry.captureException(error); // 2. 에러 발생 시 Sentry로 기록
    console.error("signInWithEmail 오류:", error);
    throw error; // 에러를 다시 던져야 상위에서 처리 가능
  }
};

// OAuth 로그인 (카카오)
export const signInWithOAuth = async (provider) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  } catch (error) {
    Sentry.captureException(error);
    console.error("signInWithOAuth 오류:", error);
    throw error;
  }
};

// 로그아웃
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    Sentry.captureException(error);
    console.error("signOut 오류:", error);
    throw error;
  }
};

// 회원가입 (이메일 + 닉네임)
export const signUpWithEmail = async (email, password, nickname) => {
  try {
    // 1️⃣ 회원가입 요청
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("회원가입 에러:", authError);
      throw new Error(authError.message);
    }

    const user = data.user;
    if (!user) {
      throw new Error("회원가입은 성공했지만, 사용자 정보를 가져올 수 없습니다.");
    }

    console.log("회원가입 성공:", user);

    // 2️⃣ 프로필 정보 추가
    const { error: dbError } = await supabase
      .from("profile")
      .upsert({
        user_id: user.id,
        username: nickname,
      });

    if (dbError) {
      throw new Error("프로필 저장 중 오류 발생: " + dbError.message);
    }

    console.log("프로필 저장 성공");

    // 3️⃣ 회원가입 후 자동 로그인 (세션 유지)
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      throw new Error("자동 로그인 실패: " + loginError.message);
    }

    console.log("자동 로그인 성공:", loginData);

    return loginData;
  } catch (error) {
    Sentry.captureException(error); // 3. 최종 catch에서 Sentry 로깅
    console.error("회원가입 오류:", error);
    throw error;
  }
};
