import { React, useState} from 'react';
import { getIdeaTypeKo } from '@/utils/typeMappings';

const IdeaItem = ({ idea ,onDelete,onEdit}) => {
  const { title, category, description, tags } = idea;
  // console.log("💥💥💥💥💥💥id는 어떻게 들어오나",idea);
    const [isHovered, setIsHovered] = useState(false);
    const backgroundColor = isHovered ? '#383940' : '#2C2D34';

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 12,
        padding: 20,
        width: 'auto',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Pretendard',
        position: 'relative', // for positioning the buttons
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 수정, 삭제 버튼 */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
        }}
      >
        <button
          style={{
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#2C2D34',
            border: '1px solid #3A3D46',
            borderRadius: 6,
            fontFamily: 'Pretendard',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={onEdit}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
        >
          수정
        </button>
        <button
          style={{
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#2C2D34',
            border: '1px solid #3A3D46',
            borderRadius: 6,
            fontFamily: 'Pretendard',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={() => onDelete?.(idea.id)} // ✅ 삭제 핸들러 실행
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
        >
          삭제
        </button>
      </div>

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
        {getIdeaTypeKo(category) || '카테고리 없음'}
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
