import React, { useEffect } from 'react';
import RecentEpiSet_test from '../WritingPageComponents/RecentEpiSet_test';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';


const StartPage = () => {
  

  return (
    <div>
        <Navbar customNavComponent={<NavMainSection />} />
        <div
            style={{
                display: 'flex',
                gap:'24px',
                flexDirection: 'column',     // 수직 정렬
                justifyContent: 'center',    // 수직 중앙 (부모가 충분한 높이를 가져야 함)
                alignItems: 'center',        // 수평 중앙
                height: '100vh',             // 화면 전체 높이 기준으로 정렬 (필요 시)
            }}
            >
            <div
                style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Pretendard, sans-serif',
                    marginBottom: '16px',
                    textAlign: 'center',
                }}
                >
                제목이 들어옵니다.
            </div>
            <RecentEpiSet_test />
        </div>

    </div>
    
     
  );
};

export default StartPage;
