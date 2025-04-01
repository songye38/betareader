import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { getAgeCategoryDisplay } from './../../models/manuscriptSettingModel'

const AgeInput = ({ control, error }) => {
  const ageCategories = [
    '전체이용가', '15세이상이용가', '19세이상이용가'
  ];

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div
      style={{
        width: 322,
        height: 'auto',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 20,
        paddingBottom: 20,
        background: '#1E1F24',
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16,
        display: 'inline-flex',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '33.60px',
            wordWrap: 'break-word',
          }}
        >
          연령대
        </div>
        <div
          style={{
            color: '#8A94FF',
            fontSize: 24,
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
          // 서버에서 받아온 값으로 초기 선택 상태 설정
          if (field.value && !selectedCategory) {
            setSelectedCategory(getAgeCategoryDisplay(field.value));
          }

          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 20,
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
