'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

const PlotInput = ({ control, error }) => {
  return (
    <div style={{ width: 959, height: 210, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24, background: '#1E1F24', borderRadius: 20, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
      
      <div style={{ color: 'white', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: '33.60px', wordWrap: 'break-word' }}>
        플룻
      </div>
      
      <Controller
        name="plot"  // form field name
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="플룻을 입력해주세요"
            style={{
              width: '100%',
              height: '100px', // 높이를 설정하여 여러 줄이 보이게 함
              paddingLeft: '12px',
              paddingTop: '8px', // 텍스트가 위로 붙지 않도록 여백 추가
              borderRadius: '8px',
              border : 'none',
              backgroundColor:'transparent',
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '28px',
              outline: 'none',
              resize: 'vertical', // 수동으로 크기를 조절할 수 있도록 설정
            }}
          />
        )}
      />
      
      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default PlotInput;
