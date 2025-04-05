import React from 'react';

const IdeaItem = ({ idea }) => {
  const { title, category, description, tags } = idea;

  return (
    <div
      style={{
        backgroundColor: '#2C2D34',
        borderRadius: 12,
        padding: 20,
        width: 'auto',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 제목 */}
      <div style={{ fontSize: 18, fontWeight: 600 }}>{title}</div>

      {/* 카테고리 */}
      <div
        style={{
          fontSize: 14,
          color: '#A6A8B3',
          backgroundColor: '#3A3D46',
          borderRadius: 6,
          padding: '4px 10px',
          width: 'fit-content',
        }}
      >
        {category || '카테고리 없음'}
      </div>

      {/* 상세내용 */}
      <div style={{ fontSize: 14, lineHeight: '1.5em', whiteSpace: 'pre-wrap' }}>
        {description || '내용이 없습니다.'}
      </div>

      {/* 태그 */}
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: 12,
                backgroundColor: '#444653',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: 6,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaItem;
