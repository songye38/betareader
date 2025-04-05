import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddIdeaPopup from "@/components/Popups/AddIdeaPopup";

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
      <AddIdeaPopup />

    </div>
  );
};

export default MainPage;
