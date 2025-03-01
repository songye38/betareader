import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SidebarComponent from "@/components/SidebarComponent"; // 사이드바
import SettingFormComponent from "@/components/SettingFormComponent"; // 설정 폼
import EpisodeFormComponent from "@/components/EpisodeFormComponent"; // 원고 폼
import StartComponent from "@/components/StartComponent";
import useStore from "@/store/useStore"; // Zustand 사용

const UserPage = ({ userId, manuscriptId }) => {
  const { selectedTab,selectedItemType} = useStore(); // Zustand에서 selectedTab 가져오기
  const router = useRouter();

  // 상태 저장할 state 정의
  const [currentTab, setCurrentTab] = useState(selectedTab);

  const renderComponent = () => {
    switch (selectedItemType) {
      case 'episode':
        return <EpisodeFormComponent />;
      case 'setting':
        return <SettingFormComponent />;
      case null:
      default:
        return <StartComponent />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarComponent /> {/* Sidebar 내부에서 Zustand의 상태 관리 */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* isSettingCreated 값에 따라 설정 폼 또는 시작 컴포넌트 렌더링 */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserPage;
