import React, { useState,useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { getAgeCategoryDisplay } from './../../models/manuscriptSettingModel'

const AgeInput = ({ control, error,getValues, loading }) => {
  const ageCategories = [
    '여성', '남성', '기타'
  ];

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
      if (!loading) {
        const ageValue = getValues("ageCategory");
        setSelectedCategory(getAgeCategoryDisplay(ageValue)); // react-hook-form의 field.value에 맞춰 selectedGenre 상태를 설정
      }
    }, [loading, getValues]); // loading이 변경될 때마다 실행
    

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 20,
        paddingBottom: 20,
        background: '#1E1F24',
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
        display: 'inline-flex',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '33.60px',
            wordWrap: 'break-word',
          }}
        >
          성별
        </div>
        <div
          style={{
            color: '#8A94FF',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            lineHeight: '33.60px',
            wordWrap: 'break-word',
          }}
        >
          *
        </div>
      </div>

      <Controller
        name="ageCategory"
        control={control}
        render={({ field }) => {

          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {ageCategories.map((ageCategory, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {/* 원을 그리기 위한 클릭 가능한 div */}
                  <div
                    onClick={() => {
                      setSelectedCategory(ageCategory); // 선택된 카테고리 상태 업데이트
                      field.onChange(ageCategory); // react-hook-form 상태 업데이트
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '1px solid #7B8091',
                      backgroundColor:
                        selectedCategory === ageCategory ? '#8A94FF' : 'transparent', // 선택된 카테고리는 보라색으로 채우기
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* 선택된 상태에서 SVG 체크 아이콘 표시 */}
                    {selectedCategory === ageCategory && (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.714355 3.39258L3.79128 7.14258L8.71436 1.14258"
                            stroke="#1E1F24"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Pretendard',
                      fontWeight: '500',
                      lineHeight: '22.40px',
                      textAlign: 'center',
                    }}
                  >
                    {ageCategory}
                  </div>
                </div>
              ))}
            </div>
          );
        }}
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

export default AgeInput;
