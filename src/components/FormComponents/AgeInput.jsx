'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

const AgeInput = ({ control, error }) => {
  const ageCategories = [
    '전체이용가', '15세이상이용가', '19세이상이용가'
  ];

  return (
    <div style={{ width: 322, height: 170, paddingLeft: 28, paddingRight: 28, paddingTop: 20, paddingBottom: 20, background: '#1E1F24', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
      <div style={{ color: 'white', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: '33.60px', wordWrap: 'break-word' }}>연령 등급</div>

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <div style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 16}}>
            {ageCategories.map((category, index) => (
              <div key={index} style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
                <div style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 4, paddingRight: 8, borderRadius: 78, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' }}>
                  <div style={{ width: 24, height: 24, position: 'relative' }}>
                    <div style={{ width: 20, height: 20, left: 2, top: 2, position: 'absolute', borderRadius: '50%', border: '0.80px #7B8091 solid' }} />
                  </div>
                  <div style={{ color: 'white', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px', wordWrap: 'break-word' }}>
                    {category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      />

      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default AgeInput;
