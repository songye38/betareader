import React from 'react';

const CharacterItem = ({ character }) => {
  const {
    name,
    role,
    ageCategory,
    age,
    keywords = [],
    appearance,
    goal,
  } = character;

  return (
    <div
      style={{
        background: '#2C2D34',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
        fontFamily: 'Pretendard',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 0 0 1px #3A3D46',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {/* 캐릭터 이름 + 역할 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 14, color: '#A0A0A0' }}>{role}</div>
      </div>

      {/* 나이/연령대 */}
      <div style={{ fontSize: 14 }}>
        <strong>연령대:</strong> {ageCategory} / <strong>나이:</strong> {age}
      </div>

      {/* 키워드 */}
      {keywords.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {keywords.map((tag, idx) => (
            <span
              key={idx}
              style={{
                background: '#3A3D46',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: 12,
                color: '#E0E0E0',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 외형특징 */}
      {appearance && (
        <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
          <strong>외형특징:</strong> {appearance}
        </div>
      )}

      {/* 주요목표 */}
      {goal && (
        <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
          <strong>주요목표:</strong> {goal}
        </div>
      )}
    </div>
  );
};

export default CharacterItem;
