// pages/main.js
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AddManuItem from "@/components/MainPageComponents/AddManuItem";

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
        <RecentEpiSet />
        <AddManuItem />
      </div>
    );
};

export default MainPage;
