'use client';

import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Tag from './Tag';

const KeywordInput = ({ control, error, onKeywordChange,getValues,loading }) => {

  const [inputValue, setInputValue] = useState(''); // 입력값
  const [newKeywords, setNewKeywords] = useState([]); // 키워드 상태
  const [isProcessing, setIsProcessing] = useState(false); // 중복 방지 플래그


  useEffect(() => {
    if (!loading) {
      const values = getValues("newKeywords");
      setNewKeywords(values);
    }
  }, [loading, getValues]); // loading이 변경될 때마다 실행



  // Enter 키 입력 시 태그 추가 (200ms 딜레이)
  const handleKeyPress = (e) => {

    if (e.key === 'Enter' && inputValue.trim() && newKeywords.length < 3 && !isProcessing) {
      e.preventDefault();
      setIsProcessing(true);

      setTimeout(() => {
        setNewKeywords((prevKeywords) => {
          const updatedKeywords = Array.isArray(prevKeywords)
            ? [...prevKeywords, inputValue.trim()]
            : [inputValue.trim()]; // 기존 값이 배열이 아니면 새 배열로 변환
          // 부모 컴포넌트에도 업데이트
          onKeywordChange(updatedKeywords);

          return updatedKeywords;
        });

        setInputValue('');
        setIsProcessing(false);
      }, 200);
    }
  };

  // 입력값 변경 시 업데이트
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // 태그 삭제 기능
  const handleDeleteTag = (index) => {
    setNewKeywords((prevKeywords) => {
      const updatedKeywords = prevKeywords.filter((_, i) => i !== index);
      // 부모 컴포넌트에도 업데이트
      onKeywordChange(updatedKeywords);
      return updatedKeywords;
    });
  };

  // useEffect(() => {
  //   console.log("contorl의 변화가 있긴 한가?",control._getFieldArray());
  //   if (control && control.getValues) {
  //     let fieldValue = control.getValues('newKeywords');

  //     if (!Array.isArray(fieldValue)) {
  //       fieldValue = []; // undefined, null, 빈 문자열("") 등일 경우 빈 배열로 초기화
  //     }

  //     if (JSON.stringify(fieldValue) !== JSON.stringify(newKeywords)) {
  //       setNewKeywords(fieldValue);
  //     }
  //   }
  // }, [control]);

  return (
    <div
      style={{
        width: 'auto',
        height: 'auto',
        padding: 24,
        background: '#1E1F24',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
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
        {Array.isArray(newKeywords) &&
          newKeywords.map((tag, index) => (
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
