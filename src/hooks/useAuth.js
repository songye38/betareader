import { useState } from 'react';
import { signInWithEmail, signInWithOAuth, signOut, signUpWithEmail } from '../models/authModel';
import supabase from '@/supabase/supabaseClient';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // 이메일 로그인 + 탈퇴된 계정 확인
  const handleEmailSignIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // signInWithEmail 호출 (이메일과 비밀번호로 로그인)
      const user = await signInWithEmail(email, password); // 이 부분에서 사용자 정보를 가져옵니다.

      // 프로필 조회
      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('is_deleted')
        .eq('user_id', user.user.id)  // user.id로 프로필 조회
        .single();

      if (profileError) {
        setError(profileError.message); // 프로필 조회 실패 시 오류 메시지 설정
        throw new Error(profileError.message); // 오류 던지기
      }

      // 탈퇴된 계정인지 체크
      if (profile.is_deleted) {
        await supabase.auth.signOut(); // ⭐ 세션 끊기
        return { isDeleted: true }; // 탈퇴된 계정임을 반환
      }

      // 정상적으로 로그인 된 경우
      return user;

    } catch (err) {
      setError(err.message); // 오류 발생 시 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };






  // OAuth 로그인
  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  // 회원가입 기능
  const handleSignUp = async (email, password, nickname) => {
    console.log("handle sign upu hook", email, password, nickname);
    setLoading(true);
    setError(null);
    try {
      const user = await signUpWithEmail(email, password, nickname);
      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleEmailSignIn, handleSignUp, handleOAuthSignIn, handleSignOut, loading, error };
};
