'use client';


import React from 'react';
import { Controller } from 'react-hook-form';

const TitleInput = ({ control, error,showLabel = true ,title,name}) => {
  return (
    <div style={{ 
        width: '100%',
        height: '100%', paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24, background: '#1E1F24', borderRadius: 12, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
        <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{ color: 'white', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '33.60px', wordWrap: 'break-word' }}>
            {title}
            </div>
            <div style={{ color: '#8A94FF', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '33.60px', wordWrap: 'break-word' }}>
                *
            </div>
      </div>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
          placeholder="제목을 입력해주세요." 
            {...field}
            style={{
              width: '100%',
              height: '20px', //제목부분
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
