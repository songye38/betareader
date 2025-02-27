// pages/main.js
import RecentEpiSet from "@/components/RecentEpiSet";

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
      </div>
    );
};

export default MainPage;
