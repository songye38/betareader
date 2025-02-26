'use client';

import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Character from './Character';

const CharactersInput = ({ control, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characters',
  });

  return (
    <div style={{ width: '100%', padding: 24, background: '#1E1F24', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>인물 목록</div>
        <button
            type="button"
            onClick={() => append({ name: '', role: '', description: '' })}
            style={{
            display: 'flex',
            width: '12rem',
            padding: '0.5rem 1.25rem 0.5rem 1rem',
            justifyContent: 'center',  
            alignItems: 'center',      
            gap: '0.25rem',
            background: 'var(--neutral-800, #2C2D34)', 
            border: 'none',
            borderRadius: '0.75rem', 
            cursor: 'pointer',
            color: 'white',
            fontFamily: 'Pretendard',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '19.6px',
            wordWrap: 'break-word',
            }}
        >
            {/* SVG Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/plus_icon.svg" alt="Profile" width={24} height={24} />
            </div>

            {/* Text */}
            <span>인물 추가</span>
      </button>
      </div>
      

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {fields.map((field, index) => (
          <div key={field.id} style={{ position: 'relative' }}>
            <Character control={control} index={index} />
            <button
              type="button"
              onClick={() => remove(index)}
              style={{
                fontSize:'20px',
                position: 'absolute',
                top: 40,
                right: -18,
                background: 'transparent',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
              }}
            >
              <img src="/close_icon.svg" alt="Profile" width={20} height={20} />
            </button>
          </div>
        ))}
      </div>

     

      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</div>}
    </div>
  );
};

export default CharactersInput;
