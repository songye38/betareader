'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

const ContentInput = ({ control, error, showLabel = true, title }) => {
  return (
    <div
      style={{
        width: '100%', // 전체 너비
        height: '100vh', // 화면 전체 높이
        display: 'flex', // flexbox 사용
        justifyContent: 'center', // 수평 중앙 정렬
        alignItems: 'center', // 수직 중앙 정렬
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 24,
        paddingBottom: 24,
        flexDirection: 'column', // 세로 방향으로 아이템 배치
        gap: 16,
        overflow: 'auto', // 스크롤 추가
        marginBottom: '100px',
      }}
    >
      {showLabel && (
        <div
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
            fontFamily: 'Pretendard',
          }}
        >
          {title}
        </div>
      )}

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <textarea
            placeholder="제목을 입력해주세요."
            {...field}
            style={{
              width: '80%',
              minHeight: '200px', // 최소 높이
              height: 'auto', // 자동 높이 조정
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '10px',
              color: 'white',
              fontSize: '18px',
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '1.7',
              outline: 'none',
              border: 'none',
              backgroundColor: 'transparent',
              resize: 'vertical', // 세로로 크기 조정 가능
              borderRadius: '8px',
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

export default ContentInput;
