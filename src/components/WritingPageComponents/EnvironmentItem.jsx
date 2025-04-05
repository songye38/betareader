import React from 'react';

const EnvironmentItem = ({ environment }) => {
  const {
    title,
    type,
    description,
    references = [],
  } = environment;

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
      {/* 제목 + 타입 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 14, color: '#A0A0A0' }}>{type}</div>
      </div>

      {/* 상세 설명 */}
      {description && (
        <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
          <strong>상세설명:</strong> {description}
        </div>
      )}

      {/* 참고 링크 */}
      {references.length > 0 && (
        <div style={{ fontSize: 14 }}>
          <strong>참고자료 링크:</strong>
          <ul style={{ paddingLeft: 16, marginTop: 8 }}>
            {references.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#68B6F3' }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnvironmentItem;
