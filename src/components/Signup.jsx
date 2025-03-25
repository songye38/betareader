import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';

const Signup = () => {
  const { control, handleSubmit } = useForm();


  // TODO OAuth 로그인도 해야한다.
  const { handleSignUp, handleOAuthSignIn, loading, error } = useAuth();
  const onSubmit = async (data) => {

    try {
      // 회원가입 처리
      const result = await handleSignUp(data.email, data.password, data.nickname);

      // 회원가입 성공 시 콘솔 출력
      console.log("회원가입 성공", result);
    } catch (error) {
      console.error("회원가입 오류", error);
    }
  };

  return (
    <div style={styles.signupContainer}>
      <h2 style={styles.header}>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* 이메일 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} type="email" placeholder="이메일을 입력하세요" required style={styles.input} />
            )}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input {...field} type="password" placeholder="비밀번호를 입력하세요" required style={styles.input} />
            )}
          />
        </div>

        {/* 닉네임 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="nickname" style={styles.label}>닉네임</label>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" placeholder="닉네임을 입력하세요" required style={styles.input} />
            )}
          />
        </div>

        {/* 오류 메시지 표시 */}
        {error && <p style={styles.error}>{error}</p>}

        {/* 가입 버튼 */}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? '회원가입...' : '회원가입'}
        </button>
      </form>

      {/*  TODO 카카오 OAuth 회원가입 버튼 */}
      {/* <button onClick={() => handleOAuthSignIn('kakao')} style={styles.oauthButton}>
        카카오로 가입하기
      </button> */}
    </div>
  );
};

const styles = {
  signupContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    background: '#2C2D34',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
  },
  input: {
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px 18px',
    background: 'rgba(96, 101, 117, 0.2)',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    color: 'white',
  },
  button: {
    width: '100%',
    padding: '14px 18px',
    backgroundColor: '#8A94FF',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '8px',
    textAlign: 'center',
  },
  oauthButton: {
    marginTop: '16px',
    padding: '14px 18px',
    backgroundColor: '#FFCD00',
    color: 'black',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Signup;
