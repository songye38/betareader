'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

const EpisodeInput = ({ control, error }) => {
  return (
    <div
      style={{
        width: 850,
        height: 'auto', // 높이를 'auto'로 변경하여 텍스트 길이에 맞게 조정됩니다.
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 24,
        paddingBottom: 24,
        background: '#1E1F24',
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16,
        display: 'inline-flex',
      }}
    >
      <Controller
        name="episode"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="제목을 입력해주세요."
            rows={10} // 기본 4행 크기로 설정
            style={{
              width: '100%',
              padding: '10px',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '22.40px',
              outline: 'none',
              border: 'none',
              backgroundColor: 'transparent',
              resize: 'vertical', // 세로로만 크기 조정 가능
            }}
          />
        )}
      />

      {/* 에러 메시지 */}
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default EpisodeInput;
