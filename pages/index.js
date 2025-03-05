import { useEffect, useState } from "react";
import RecentEpiSet from "@/components/MainPageComponents/RecentEpiSet";
import AllManuSet from "@/components/MainPageComponents/AllManuSet";
import AddManuPopup from "@/components/Popups/AddManuPopup";
import UploadingEpi from "@/components/Modal/UploadingEpi";

const API_BASE_URL = "http://175.106.97.51:8080"; // API 기본 URL

const MainPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const size = 5; // 불러올 에피소드 개수 (필수)

  useEffect(() => {
    const fetchEpisodes = async (size) => {
      try {
        const response = await fetch(`${API_BASE_URL}/novels/episodes?size=${size}`);
        
        if (!response.ok) {
          throw new Error(`에피소드 데이터를 불러오는 데 실패했습니다. (HTTP ${response.status})`);
        }

        const data = await response.json();
        setEpisodes(data); // 불러온 데이터를 상태로 저장
      } catch (error) {
        console.error("❌ 데이터 가져오기 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes(size);
  }, []);

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
      {loading && <p>📌 데이터를 불러오는 중...</p>}
      {error && <p>❌ 오류 발생: {error}</p>}
      
      {!loading && !error && <RecentEpiSet episodes={episodes} />}
      
      {/* TODO : 서버에서 가져온 값으로 바꾸기 */}
      <AllManuSet userId={1} manuscriptId={1} />
      <AddManuPopup />
      <UploadingEpi />
    </div>
  );
};

export default MainPage;
