import { useRouter } from "next/router";
import SidebarComponent from "@/components/SidebarComponent"; // 사이드바
import useStore from '@/store/useStore'; // Zustand 스토어 사용
import StartComponent from "@/components/StartComponent"; // 시작 페이지
import SettingFormComponent from "@/components/SettingFormComponent"; // 설정 폼 컴포넌트
import EpisodeFormComponent from "@/components/EpisodeFormComponent"; // 에피소드 폼 컴포넌트

const UserPage = ({ userId, manuscriptId }) => {
  const { activeTab, selectedTab } = useStore((state) => state); // Zustand에서 activeTab과 setActiveTab을 가져오기
  const router = useRouter();

  console.log("selectedTab: " , selectedTab);

  // 조건부 렌더링을 위한 컴포넌트
  const renderContent = () => {
    if (!selectedTab) {
      return <StartComponent />;  // selectedTab이 없을 때는 StartComponent 렌더링
    }
    
    if (selectedTab === 'settings') {
      return <SettingFormComponent />;  // 'settings'일 때는 SettingFormComponent 렌더링
    } else {
      return <EpisodeFormComponent />;  // 그 외의 경우는 EpisodeFormComponent 렌더링
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row',gap:'24px' }}>
      <SidebarComponent />
      {renderContent()}
    </div>
  );
};

export default UserPage;
