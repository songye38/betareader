import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';

const Signin = () => {
  const { control, handleSubmit } = useForm();
  const { handleEmailSignIn, loading, error } = useAuth();


  const onSubmit = async (data) => {

    try {
      // 로그인 처리
      const result = await handleEmailSignIn(data.email, data.password);

      // 회원가입 성공 시 콘솔 출력
      console.log("회원가입 성공", result);
    } catch (error) {
      console.error("회원가입 오류", error);
    }
  };

  return (
    <div className="signin-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        {/* 이메일 입력 */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="이메일을 입력하세요"
                required
                style={inputStyle}
              />
            )}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                style={inputStyle}
              />
            )}
          />
        </div>

        {/* 오류 메시지 표시 */}
        {error && <p className="error">{error}</p>}

        {/* 로그인 버튼 */}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? '로그인...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default Signin;

const inputStyle = {
  width: '100%',
  padding: '12px 18px',
  background: 'rgba(96, 101, 117, 0.2)',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '500',
  color: 'white',
  border: 'none',
  outline: 'none',
  resize: 'none',
  marginBottom: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '14px 18px',
  backgroundColor: '#8A94FF',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
};

const styles = {
  '.signin-container': {
    margin: '0 auto',
    background: 'blue',
    borderRadius: '16px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '.signin-container h2': {
    color: 'white',
    fontSize: '24px',
    marginBottom: '20px',
  },

  '.signin-form': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  '.input-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  '.input-group label': {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
  },

  '.input-group input': {
    fontSize: '16px',
    fontWeight: '500',
  },

  'button:disabled': {
    backgroundColor: '#b0b0b0',
    cursor: 'not-allowed',
  },

  '.error': {
    color: 'red',
    fontSize: '14px',
    marginTop: '8px',
    textAlign: 'center',
  },
};
