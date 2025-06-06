import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { getCharacterTypeDisplay } from '@/models/manuscriptSettingModel';

const Character = ({ control, index,getValues, loading }) => {
  const [selectedCharacterType, setSelectedCharacterType] = useState('');

    // useEffect(() => {
    //   if (!loading) {
    //     const characterValue = getValues("characters");
    //     setSelectedCharacterType(getCharacterTypeDisplay((characterValue));
    //   }
    // }, [loading, getValues]); // loading이 변경될 때마다 실행

  return (
    <div
      style={{
        width: 'auto',
        height: 'auto',
        padding: 20,
        background: '#2C2D34',
        borderRadius: 16,
        border: '1px solid #3A3D46',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      {/* 왼쪽 (이름 & 역할) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* 인물 이름 입력 */}
        <Controller
          name={`characters[${index}].name`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="이름을 입력하세요"
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: 'white',
                background: 'transparent',
                border: 'none',
                outline: 'none',
              }}
            />
          )}
        />

        {/* 역할 선택 */}
        <Controller
          name={`characters[${index}].role`}
          control={control}
          render={({ field }) => {
            // `useEffect`를 사용하여 서버에서 가져온 값으로 `selectedCharacterType`을 업데이트
            useEffect(() => {
              if (field.value) {
                setSelectedCharacterType(getCharacterTypeDisplay(field.value)); // 서버에서 받아온 역할값을 바로 업데이트
              }
            }, [field.value]); // field.value가 변경될 때마다 실행

            return (
              <div style={{ display: 'flex', gap: 14 }}>
                {['주연', '조연'].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      field.onChange(item); // 클릭 시 역할 변경
                      setSelectedCharacterType(item); // 선택된 항목을 `selectedCharacterType`에 업데이트
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      flexDirection: 'row',
                    }}
                  >
                    {/* 원을 그리기 위한 클릭 가능한 div */}
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '1px solid #7B8091',
                        backgroundColor: selectedCharacterType === item ? '#8A94FF' : 'transparent', // 선택된 항목에 보라색 채우기
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative', // 원 안에 SVG를 절대적으로 배치하기 위한 설정
                      }}
                    >
                      {/* 선택된 항목에 체크 아이콘 표시 */}
                      {selectedCharacterType === item && (
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                      {/* SVG 아이콘을 원 안에 넣기 */}
                      {selectedCharacterType === item && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            position: 'absolute', // 절대 위치 지정
                            width: '8px',
                            height: '8px',
                          }}
                        >
                          <path
                            d="M0.714355 3.39258L3.79128 7.14258L8.71436 1.14258"
                            stroke="#1E1F24"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    <div style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>

      {/* 오른쪽 (소개 입력) */}
      <Controller
        name={`characters[${index}].description`}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="소개를 입력하세요"
            style={{
              width: 568,
              padding: '12px 18px',
              background: 'rgba(96, 101, 117, 0.2)',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: '500',
              color: 'white',
              border: 'none',
              outline: 'none',
              resize: 'none',
            }}
          />
        )}
      />
    </div>
  );
};

export default Character;
