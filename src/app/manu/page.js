

import EpisodeFormComponent from "@/components/EpisodeFormComponent";
import SidebarComponent from "@/components/SidebarComponent";




// pages/manu.js
const ManuscriptPage = () => {
    return (
      <div style={{
        display: 'flex',        // Flexbox 사용
        flexDirection: 'row',   // 가로로 배치
        justifyContent: 'flex-start', // 왼쪽 정렬 (옵션, 기본값)
        alignItems: 'flex-start',     // 세로 정렬 (옵션, 기본값)
        gap: '16px',            // 두 컴포넌트 간의 간격 (선택적)
      }}>
        <SidebarComponent />
        <EpisodeFormComponent />
      </div>

    );
  };
  
  export default ManuscriptPage;
  



