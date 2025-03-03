'use client';

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Tag from './Tag';

const KeywordInput = ({ control, error, newKeywords, onKeywordChange }) => {
  const [inputValue, setInputValue] = useState(''); // 입력값
  const [isProcessing, setIsProcessing] = useState(false); // 중복 방지 플래그

  // Enter 키 입력 시 태그 추가 (300ms 딜레이)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && newKeywords.length < 3 && !isProcessing) {
      e.preventDefault(); // 기본 이벤트 방지
      setIsProcessing(true); // 중복 실행 방지

      setTimeout(() => {
        // newKeywords에 입력된 값이 없다면 추가
        if (!newKeywords.includes(inputValue.trim())) {
          const updatedKeywords = [...newKeywords, inputValue.trim()];
          onKeywordChange(updatedKeywords); // 키워드 변경 함수 호출
        }

        setInputValue(''); // 입력 필드 초기화
        setIsProcessing(false); // 처리 완료 후 다시 활성화
      }, 200); // 200ms 후에 실행
    }
  };

  // 입력값 변경 시 업데이트
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // 태그 삭제 기능
  const handleDeleteTag = (index) => {
    const updatedKeywords = newKeywords.filter((_, i) => i !== index);
    onKeywordChange(updatedKeywords); // 키워드 변경 함수 호출
  };

  return (
    <div style={{
      width: 959,
      height: 'auto',
      padding: 24,
      background: '#1E1F24',
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <div style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>
        키워드 (최대 3개)
      </div>

      {/* 키워드 입력 필드 */}
      <Controller
        name="newKeywords"
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
        {newKeywords.map((tag, index) => (
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
