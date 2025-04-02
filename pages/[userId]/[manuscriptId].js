
import SidebarComponent from "@/components/SidebarComponent"; // 사이드바
import useStore from '@/store/useTabStore'; // Zustand 스토어 사용
import StartComponent from "@/components/StartComponent"; // 시작 페이지
import EpisodeFormComponent from "@/components/EpisodeFormComponent"; // 에피소드 폼 컴포넌트
import { fetchManuscriptById } from "@/models/manuscriptModel"; // 원고 가져오는 함수
import { useState, useEffect } from "react";
import useManuscriptStore from "@/store/useManuscriptStore";

const UserPage = () => {
  const { selectedTab } = useStore((state) => state); // Zustand에서 selectedTab 가져오기
  const [isSetup, setIsSetup] = useState(false); // 원고 데이터의 isSetup 상태를 저장
  const { manuscript,setManuscript } = useManuscriptStore(); 
  const {resetTabs} = useStore();



// 각 EpisodeFormComponent에 개별적인 상태 관리
const [episodeData, setEpisodeData] = useState(null);




  // manuscript.id가 있을 때 원고 데이터를 가져오는 함수
  useEffect(() => {
    const fetchManuscriptData = async () => {
      if (manuscript.id) {
        try {
          const data = await fetchManuscriptById(manuscript.id);
          console.log("원래 저장했던 데이터",data);
          setManuscript(data); // 🆕 Zustand 업데이트
          setIsSetup(data.isSetup);
          console.log("📌 Zustand 저장된 manuscript:", manuscript); // 📌 콘솔에서 확인
          console.log("isSetup", isSetup);
        } catch (error) {
          console.error("Error fetching manuscript:", error);
        }
      }
    };

    fetchManuscriptData();
  }, [manuscript.id,selectedTab]); 

  // 페이지 나갈 때 탭 초기화
  useEffect(() => {
    return () => {
      resetTabs();
    };
  }, []);




  // 조건부 렌더링을 위한 컴포넌트
  const renderContent = () => {
    if (selectedTab && selectedTab.id) {
      // selectedTab이 존재하면 EpisodeFormComponent를 렌더링
      return <EpisodeFormComponent />;
    } else {
      // selectedTab이 없으면 StartComponent를 렌더링
      return <StartComponent />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
      <SidebarComponent />
      {renderContent()}
    </div>
  );
};

export default UserPage;
