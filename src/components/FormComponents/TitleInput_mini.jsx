'use client';


import React from 'react';
import { Controller } from 'react-hook-form';

const TitleInput_mini = ({ control, error,showLabel = true ,title}) => {

  return (
    <div style={{ 
        width: '100%',
        height: '100%', paddingLeft: 4, paddingRight: 4, paddingTop: 24, paddingBottom: 24, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
      
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
          placeholder="제목을 입력해주세요." 
            {...field}
            style={{
              width: '100%',
              height: '20px', //제목부분
              color: 'white',
              fontSize: '24px',
              fontFamily: 'Pretendard',
              fontWeight: '600',
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

export default TitleInput_mini;
