// pages/main.js
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";

const MainPage = () => {
    return (
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap:'32px',
        }}

      >
        <RecentEpiSet />
        <AllManuSet />

      </div>
    );
};

export default MainPage;
