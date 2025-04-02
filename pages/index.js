import { useState } from "react";
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";
import UploadingEpi from "@/components/Modal/UploadingEpi";
import StartManuPopup from "@/components/Popups/StartManuPopup";


const MainPage = () => {

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >


      
      <RecentEpiSet />
      <AllManuSet />

    </div>
  );
};

export default MainPage;
