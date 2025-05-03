import AddManuBtn from "../Buttons/AddManuBtn";
import ManuItem from "./ManuItem";
import AddManuItem from "./AddManuItem";
import useManuscripts from "@/hooks/useManuscripts";
import LoadingSpinner from "../etc/LoadingSpinner";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import './AllManuSet.css'; // css 파일 임포트

const AllManuSet = () => {
  const { manuscripts, loading, error, getManuscripts } = useManuscripts();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !user.id) return;
    getManuscripts();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="loader">
        <LoadingSpinner size={48} color="#FF3D00" />
      </div>
    )
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div className="all-manu-container">
      <div className="all-manu-header">
        <div className="all-manu-title">모든 원고집</div>
        {manuscripts.length > 0 && <AddManuBtn />}
      </div>

      <div className="all-manu-list">
        {manuscripts.length > 0 ? (
          manuscripts.map((manuscript) => (
            <ManuItem
              key={manuscript.id}
              title={manuscript.title}
              lastEditedAt={manuscript.last_edited_at}
              episodeCount={manuscript.episode_count}
              userId={manuscript.user_id}
              ManuId={manuscript.id}
            />
          ))
        ) : (
          <div className="all-manu-empty">
            <AddManuItem />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllManuSet;
