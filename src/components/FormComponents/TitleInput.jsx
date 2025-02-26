'use client';


import React from 'react';
import { Controller } from 'react-hook-form';

const TitleInput = ({ control, error }) => {
  return (
    <div style={{ width: 959, height: 126, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24, background: '#1E1F24', borderRadius: 20, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
      <div style={{ color: 'white', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: '33.60px', wordWrap: 'break-word' }}>제목</div>
      
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
          placeholder="제목을 입력해주세요." 
            {...field}
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '10px',
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '28px',
              outline: 'none',
              border : 'none',
              backgroundColor:'transparent',
            }}
          />
        )}
      />
      
      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default TitleInput;
