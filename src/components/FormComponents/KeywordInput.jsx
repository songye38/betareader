'use client';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Tag from './Tag';

const KeywordInput = ({ control, error, initialKeywords = [], onKeywordChange }) => {
  const [inputValue, setInputValue] = useState(''); // 입력값 상태
  const [keywords, setKeywords] = useState(initialKeywords); // 키워드 리스트 상태

  // Enter 키 입력 시 태그 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && keywords.length < 3) {
      e.preventDefault(); // 기본 이벤트 방지

      const newKeyword = inputValue.trim();

      // 중복 체크 후 키워드 추가
      if (!keywords.includes(newKeyword)) {
        const updatedKeywords = [...keywords, newKeyword];
        setKeywords(updatedKeywords);
        setInputValue(''); // 입력 필드 초기화

        // 부모 컴포넌트에 변경사항 전달
        if (onKeywordChange) {
          onKeywordChange(updatedKeywords);
        }
      }
    }
  };

  // 입력값 변경 시 업데이트
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // 태그 삭제 기능
  const handleDeleteTag = (index) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);

    // 부모 컴포넌트에 변경사항 전달
    if (onKeywordChange) {
      onKeywordChange(updatedKeywords);
    }
  };

  return (
    <div style={{
      width: 'auto',
      height: 'auto',
      padding: 24,
      background: '#1E1F24',
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <div style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
        키워드 (최대 3개)
      </div>

      {/* 키워드 입력 필드 */}
      <Controller
        name="keywords"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="키워드를 입력해주세요."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
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
              border: 'none',
              backgroundColor: 'transparent',
            }}
          />
        )}
      />

      {/* 태그 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
        {keywords.map((tag, index) => (
          <Tag key={index} onDelete={() => handleDeleteTag(index)}>
            {tag}
          </Tag>
        ))}
      </div>

      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default KeywordInput;
