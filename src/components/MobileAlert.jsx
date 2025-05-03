import React, { useEffect, useState } from 'react';

const MobileAlert = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 화면 크기를 감지하는 함수
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // 초기 화면 로드 시 한 번 확인
    checkMobile();

    // 화면 크기 변경 시마다 확인
    window.addEventListener('resize', checkMobile);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    isMobile && (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#f44336',
          color: 'white',
          textAlign: 'center',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1000, // 다른 요소 위에 표시되도록 설정
        }}
      >
        <p>글쓰는 것은 데스크탑 버전을 이용하시는 것을 추천드립니다.</p>
      </div>
    )
  );
};

export default MobileAlert;
