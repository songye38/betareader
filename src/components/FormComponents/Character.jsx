import React from 'react';
import { Controller } from 'react-hook-form';

const Character = ({ control, index }) => {
  return (
    <div
      style={{
        width: 903,
        height: 114,
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
          render={({ field }) => (
            <div style={{ display: 'flex', gap: 14 }}>
              {['주연', '조연'].map((item) => (
                <div
                  key={item}
                  onClick={() => field.onChange(item)} // 클릭 시 역할 변경
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 8px',
                    borderRadius: 8,
                    border: field.value === item ? '1px solid #7B8091' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: '0.8px solid #7B8091',
                      backgroundColor: field.value === item ? '#7B8091' : 'transparent',
                    }}
                  />
                  <div style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
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
