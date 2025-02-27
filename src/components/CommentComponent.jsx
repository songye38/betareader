import React from 'react';

const CommentComponent = () => {
  return (
    <div style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'row', position: 'relative' }}>
      {/* 프로필 이미지 */}
      <img
        src="/profile_basic_img.svg"
        alt="Profile"
        width={32}
        height={52}
        style={{
          position: 'absolute', // 절대 위치로 설정
          top: 10, // 세로 위치 조정
          left: 30, // 좌측 여백 조정 (필요시)
          zIndex: 2, // 두 번째 요소와 겹치게 하기 위해 zIndex 설정
        }}
      />

      {/* 첫 번째 섹션 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: 28,
          paddingRight: 28,
          paddingTop: 22,
          paddingBottom: 22,
          background: '#1E1F24',
          borderRadius: 24,
          border: '1px #4A4E5B solid',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          display: 'inline-flex',
          marginLeft: 50, // 이미지가 겹치므로 좌측 여백을 주어 텍스트가 잘리지 않게 조정
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'inline-flex',
          }}
        >
          {/* Name */}
          <div
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: '22.4px',
              wordWrap: 'break-word',
            }}
          >
            Name
          </div>
          {/* Text */}
          <div
            style={{
              color: '#D9DEEE',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '22.4px',
              wordWrap: 'break-word',
            }}
          >
            TextText
          </div>
        </div>

        {/* SVG Icon */}
        <div data-svg-wrapper>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="12" fill="#3A3D46" />
            <path
              d="M18.4999 12.5574C16.3666 7.26298 8.8999 7.82689 8.8999 14.5938C8.8999 21.3607 18.4999 27 18.4999 27C18.4999 27 28.0999 21.3607 28.0999 14.5938C28.0999 7.82689 20.6332 7.26298 18.4999 12.5574Z"
              fill="#5E6CFF"
              stroke="#5E6CFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
