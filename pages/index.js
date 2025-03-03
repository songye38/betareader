// pages/main.js
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";
import UploadingEpi from "@/components/Modal/UploadingEpi";
import MyPageModal from "@/components/Modal/MyPageModal";

const MainPage = () => {
    return (
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        //   height: "100vh",
          gap:'32px',
        }}

      >
        <RecentEpiSet />
        <AllManuSet />
        <AddManuPopup />
        <UploadingEpi />
        <MyPageModal />

      </div>
    );
};

export default MainPage;
