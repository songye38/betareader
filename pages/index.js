// pages/main.js
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";

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
        <AddManuPopup />

      </div>
    );
};

export default MainPage;
