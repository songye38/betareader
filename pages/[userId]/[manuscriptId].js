import { useEffect } from "react";
import { useRouter } from "next/router";
import SidebarComponent from "@/components/SidebarComponent"; // 사이드바
import SettingFormComponent from "@/components/SettingFormComponent"; // 설정 폼
import EpisodeFormComponent from "@/components/EpisodeFormComponent"; // 원고 폼
import StartComponent from "@/components/StartComponent";
import useStore from "@/store/useStore"; // Zustand 사용

const UserPage = ({ userId, manuscriptId }) => {
  const { selectedTab } = useStore(); // Zustand에서 selectedTab 가져오기
  const router = useRouter();

  console.log("selectedTab: " ,selectedTab)

  useEffect(() => {
    console.log("selectedTab updated:", selectedTab);
  }, [selectedTab]);

  return (
    <div style={{ display: "flex" }}>
      <SidebarComponent /> {/* Sidebar 내부에서 Zustand의 상태 관리 */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* selectedTab 값에 따라 다른 컴포넌트 렌더링 */}
        {selectedTab ? (
            <EpisodeFormComponent />
            ) : (
            <div>선택된 탭이 없습니다.</div>
            )}
      </div>
    </div>
  );
};

export default UserPage;
