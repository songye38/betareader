import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Signup = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Submit handler for the form
  const onSubmit = (data) => {
    setLoading(true);
    setError(null);

    // Placeholder for signup logic (Supabase API or other)
    // Simulate success
    setTimeout(() => {
      console.log('User signed up:', data);
      setLoading(false);
    }, 2000);

    // Handle error
    // setError('Signup failed');  // Uncomment this line to simulate error
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
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

        {/* 닉네임 입력 */}
        <div className="input-group">
          <label htmlFor="nickname">닉네임</label>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="닉네임을 입력하세요"
                required
                style={inputStyle}
              />
            )}
          />
        </div>

        {/* 오류 메시지 표시 */}
        {error && <p className="error">{error}</p>}

        {/* 가입 버튼 */}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? '회원가입...' : '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default Signup;

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
  '.signup-container': {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    background: '#2C2D34',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '.signup-container h2': {
    color: 'white',
    fontSize: '24px',
    marginBottom: '20px',
  },

  '.signup-form': {
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
