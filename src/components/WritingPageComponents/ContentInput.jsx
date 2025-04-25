'use client';

import React, { useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';

const ContentInput = ({ control, error,disabled = false}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, []);

  const handleResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 실제 높이로 설정
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 28px',
        flexDirection: 'column',
        gap: 16,
        marginBottom: '100px',
      }}
    >

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="제목을 입력해주세요."
            ref={(e) => {
              textareaRef.current = e;
              field.ref(e);
            }}
            disabled={disabled}
            onInput={(e) => {
              field.onChange(e); // form value 업데이트
              handleResize(); // 높이 조절
            }}
            style={{
              width: '80%',
              minHeight: '200px',
              padding: '10px',
              color: disabled ? 'rgba(255, 255, 255, 0.5)' : 'white', // ✅ 흐리게 처리
              fontSize: '18px',
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '1.7',
              outline: 'none',
              border: 'none',
              backgroundColor: 'transparent',
              resize: 'none', // 직접 리사이즈 비활성화
              borderRadius: '8px',
              overflow: 'hidden', // 스크롤 없이 확장
              transition: 'height 0.2s ease',
            }}
          />
        )}
      />

      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default ContentInput;