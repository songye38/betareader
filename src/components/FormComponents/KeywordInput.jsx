'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import Tag from './Tag';

const KeywordInput = ({ control, error }) => {
  return (
    <div style={{ width: 959, height: 182, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24, background: '#1E1F24', borderRadius: 20, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex' }}>
      
      <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex' }}>
        <div style={{ color: 'white', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: '33.60px', wordWrap: 'break-word' }}>키워드(최대 3개)</div>
      </div>

      <Controller
        name="title"
        control={control}

        render={({ field }) => (
          <input
          placeholder="키워드를 입력해주세요."  // replacement처럼 동작하는 placeholder 추가
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
      <div style={{
        display: 'flex',
        flexDirection:'row',
        gap:'12px',
      }}>
        <Tag>회귀물</Tag>
        <Tag>로맨스판타지</Tag>

      </div>


      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default KeywordInput;
