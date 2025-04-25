import React from 'react';

const MyTooltip = () => {
  return (
    <div style={{ width: 396, height: 185.5, position: 'relative' }}>
      {/* SVG + 툴팁을 감싸는 부모 div */}
      <div
        style={{
          position: 'absolute',
          left: -250, // SVG와 툴팁을 같이 이동
          top: -40, // SVG와 툴팁을 함께 이동
        }}
      >
        {/* SVG 추가 (가운데 정렬) */}
        <div
          data-svg-wrapper
          style={{
            display: 'flex',
            justifyContent: 'center', // 중앙 정렬
            width: '100%', // 부모 너비를 꽉 채워야 정렬 적용됨
            marginBottom: -1, // ✅ SVG와 툴팁을 완전히 붙이기
          }}
        >
          <svg
            width="28"
            height="14"
            viewBox="0 0 28 14"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }} // ✅ 여백 제거
          >
            <path
              d="M7.68518 3.62271C10.888 -0.495256 17.112 -0.495253 20.3148 3.62271L28 13.5037H0L7.68518 3.62271Z"
              fill="white"  // ✅ 채우기 색상 유지
            />
          </svg>
        </div>

        {/* Tooltip 내용 */}
        <div
          style={{
            width: 396,
            height: 172,
            paddingLeft: 28,
            paddingRight: 28,
            paddingTop: 24,
            paddingBottom: 24,
            background: 'white',
            borderRadius: 16,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'inline-flex',
            position: 'relative',
            marginTop: -1, // ✅ SVG와 툴팁을 완전히 붙이기
          }}
        >
          <div
            style={{
              color: '#121212',
              fontSize: 18,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: '25.20px',
              wordWrap: 'break-word',
            }}
          >
            연재물 기본 설정집 입력
          </div>
          <div
            style={{
              width: 340,
              color: '#1E1F24',
              fontSize: 16,
              fontFamily: 'Pretendard',
              fontWeight: '400',
              lineHeight: '22.40px',
              wordWrap: 'break-word',
              wordBreak: 'keep-all', // ✅ 단어가 잘리지 않도록 설정
              overflowWrap: 'break-word', // ✅ 긴 단어가 넘칠 경우 자동 줄바꿈
            }}
          >
            원고지를 작성하고, 작품의 성격에 맞는 가상 독자를 생성하려면 제목, 장르 등 연재물의 기본 설정 입력이 필요해요. 원고지 작성에 앞서 기본 설정집을 입력해주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTooltip;
