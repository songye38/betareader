import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import UserSectionComponent from "@/components/UserSection/UserSectionComponent";
import useAuthStore from "@/store/useAuthStore"; // 사용자 상태 가져오기
import WelcomeBackSection from "@/components/IntroComponents/WelcomeBackSection";

const MainPage = () => {


  const { user } = useAuthStore();

  // 로그인 안 된 상태 → 값이 undefined일 수도 있으니 체크 강화
  const isLoggedIn = user?.id && user?.email;

  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        <WelcomeBackSection />
      </div>
    );
  }

  // 로그인된 상태
  return (
    <div
      style={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <UserSectionComponent />
      <RecentEpiSet />
      <AllManuSet />
    </div>
  );
};


export default MainPage;
