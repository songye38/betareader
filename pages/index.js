import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import UserSectionComponent from "@/components/UserSection/UserSectionComponent";

const MainPage = () => {

  return (
    <div 
      style={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <UserSectionComponent />
      <RecentEpiSet />
      <AllManuSet />
    </div>
  );
};

export default MainPage;
