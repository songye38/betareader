
import Button1 from "@/components/Buttons/Button1";
import EpisodeTab from "@/components/EpisodeTab";

// pages/main.js
const MainPage = () => {
    return (
      <div>
        <Button1 />
        <EpisodeTab label="설정집" selected={true} />
        <EpisodeTab label="원고집" selected={false} />
      </div>
    );
  };
  
  export default MainPage;
  