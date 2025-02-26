'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

const GenreInput = ({ control, error }) => {
  const genres = [
    '로맨스', 'BL', '로맨스 판타지', 'GL', '판타지', '공포',
    '현대 판타지', '무협', '추리', '드라마'
  ];

  return (
    <div style={{ width: 621, height: 170, paddingLeft: 28, paddingRight: 28, paddingTop: 20, paddingBottom: 20, background: '#1E1F24', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex' }}>
      <div style={{ color: 'white', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: '33.60px', wordWrap: 'break-word' }}>장르</div>
      
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, flexDirection: 'row' }}>
            {genres.map((genre, index) => (
              <div key={index} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '16px', display: 'inline-flex' }}>
                <div
                  style={{
                    paddingTop: 4, paddingBottom: 4, paddingLeft: 4, paddingRight: 8, borderRadius: 78, justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'inline-flex', cursor: 'pointer',paddingRight:'16px', paddingBottom:'16px',
                  }}
                >
                  <input
                    type="checkbox"
                    value={genre}
                    {...field}
                    checked={field.value.includes(genre)} // 해당 장르가 선택되었는지 확인
                    onChange={(e) => {
                      // 해당 장르를 선택/해제하는 함수
                      const value = e.target.value;
                      const updatedGenres = e.target.checked
                        ? [...field.value, value]
                        : field.value.filter((item) => item !== value);
                      field.onChange(updatedGenres);
                    }}
                    style={{
                      width: 24, height: 24, position: 'relative', borderRadius: '50%', border: '0.80px #7B8091 solid'
                    }}
                  />
                  <div style={{ color: 'white', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px', wordWrap: 'break-word' }}>
                    {genre}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      />
      
      {/* 에러 메시지 */}
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default GenreInput;
