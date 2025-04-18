import AddManuBtn from "../Buttons/AddManuBtn";
import ManuItem from "./ManuItem";
import AddManuItem from "./AddManuItem";
import useManuscripts from "@/hooks/useManuscripts";
import LoadingSpinner from "../etc/LoadingSpinner";

const AllManuSet = ({ userId, manuscriptId }) => {
  const { manuscripts, loading, error } = useManuscripts();

  if (loading) {
    return (
      <div className="loader" style={{ position: 'absolute', top: 0, left: 0 }}>
        <LoadingSpinner size={48} color="#FF3D00" /> {/* 로딩 스피너 사용 */}
      </div>  
    )
   
    // return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  if (error) {
    return <div>에러 발생: {error}</div>; // 에러 메시지 표시
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px",marginBottom:'60px' }}>
      <div
        style={{
          width: 1096,
          height: 40,
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "Pretendard",
            fontWeight: "700",
            lineHeight: "33.60px",
            wordWrap: "break-word",
          }}
        >
          모든 원고집
        </div>
        <AddManuBtn />
      </div>

      {/* 원고집이 있다면 표시 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {manuscripts.length > 0 ? (
          manuscripts.map((manuscript) => (
            <ManuItem
              key={manuscript.id}
              title={manuscript.title}
              lastEditedAt={manuscript.last_edited_at}
              episodeCount={manuscript.episode_count}
              userId = {manuscript.user_id}
              ManuId = {manuscript.id}
            />
          ))
        ) : (
          <div
            style={{
              backgroundColor: "#1E1F24",
              borderRadius: "20px",
              paddingTop: "46px",
              paddingBottom: "46px",
            }}
          >
            <AddManuItem />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllManuSet;
