import { useState } from 'react';
import { signInWithEmail, signInWithOAuth, signOut,signUpWithEmail } from '../models/authModel';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 이메일 로그인
  const handleEmailSignIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmail(email, password);
      return user;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    console.log("handle sign upu hook",email, password, nickname);
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
