import {React,useState }from 'react';
import { getEnvironmentTypeKo } from '@/utils/typeMappings';

const EnvironmentItem = ({ environment, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const backgroundColor = isHovered ? '#383940' : '#2C2D34';

  // console.log("들어온environment ,environment",environment);
  const {
    title,
    type,
    description,
    references = [],
  } = environment;

  return (
    <div
      style={{
        background: backgroundColor,
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
        position: 'relative', // Ensure the buttons are fixed and the content is laid out below
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
          onClick={onEdit}
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
          onClick={() => onDelete?.(environment.id)} // ✅ 삭제 핸들러 실행
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
        >
          삭제
        </button>
      </div>

      {/* 제목 */}
      <div style={{ fontSize: 18, fontWeight: 600 }}>{environment.title}</div>

      {/* 타입 */}
      <div style={{ fontSize: 14, color: '#A0A0A0', marginTop: '20px' }}>{getEnvironmentTypeKo(environment.type) || '카테고리 없음'}</div>

      {/* 상세 설명 */}
      {description && (
        <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
          <strong>상세설명:</strong> {environment.description}
        </div>
      )}

      {/* 참고 링크 */}
      {environment.reference_list.length > 0 && (
        <div style={{ fontSize: 14 }}>
          <strong>참고자료 링크:</strong>
          <ul style={{ paddingLeft: 16, marginTop: 8 }}>
            {environment.reference_list.map((link, idx) => (
              <li key={idx} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#68B6F3',
                    display: 'block',  // Make the <a> tag a block element
                    maxWidth: '100%', // Ensure it does not overflow its parent
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',  // Prevent wrapping
                  }}
                >
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
