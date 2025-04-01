import { useState } from "react";
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";
import UploadingEpi from "@/components/Modal/UploadingEpi";
import StartManuPopup from "@/components/Popups/StartManuPopup";


const MainPage = () => {
  const episodes = [
    {
      id : 1,
      novelTitle: "용사의 귀환",
      timeAgo: "1시간 전",
      episodeNumber: 1,
      content: "용사가 오랜 여행 끝에 마을로 돌아왔다.",
    },
    {
      id : 2,
      novelTitle: "마법사의 일기",
      timeAgo: "3시간 전",
      episodeNumber: 2,
      content: "마법사는 오늘도 실험을 이어갔다. 뜻밖의 발견이 있었다.",
    },
    {
      id : 3,
      novelTitle: "검은 숲의 비밀",
      timeAgo: "어제",
      episodeNumber: 3,
      content: "숲 속 깊은 곳에서 의문의 빛을 발견했다.",
    },
    {
      id : 4,
      novelTitle: "드래곤과의 계약",
      timeAgo: "2일 전",
      episodeNumber: 4,
      content: "용사는 드래곤과 목숨을 건 계약을 맺었다.",
    },
    {
      id : 5,
      novelTitle: "사라진 왕국",
      timeAgo: "5일 전",
      episodeNumber: 5,
      content: "전설 속의 왕국이 사라진 진실이 드러난다.",
    },
  ];

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

      {/* TODO 실제 데이터 불러오는 것으로 변경 */}
      
      <RecentEpiSet episodes={episodes} />
      
      {/* TODO : 서버에서 가져온 값으로 바꾸기 */}
      <AllManuSet />
      <AddManuPopup />
      <UploadingEpi />
      {/* <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
        <SigninModal />
        <SignupModal />
      </div> */}
    </div>
  );
};

export default MainPage;
