// pages/main.js
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";
import UploadingEpi from "@/components/Modal/UploadingEpi";

const MainPage = () => {
    return (
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap:'32px',
        }}

      >
        <RecentEpiSet />
        {/* TODO : 서버에서 가져온 값으로 바꾸기 */}

        {/* 일단 지금은 하드코딩 해놨고 나중에는 적합한 값을 넣어주어야 함 */}
        <AllManuSet userId={1} manuscriptId={1}/>
        <AddManuPopup />
        <UploadingEpi />

      </div>
    );
};

export default MainPage;
