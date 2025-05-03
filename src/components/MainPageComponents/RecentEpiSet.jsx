import React, { useEffect } from 'react';
import RecentEpiItem from './RecentEpiItem';
import useEpisodeForm from '@/hooks/useEpisode';
import useAuthStore from '@/store/useAuthStore';
import './RecentEpiSet.css'; // css 파일 임포트

const RecentEpiSet = () => {
  const { recentEpisodes = [], fetchRecentEpisodes } = useEpisodeForm();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !user.id) return;
    fetchRecentEpisodes(user.id);
  }, [user?.id]);

  return (
    <div className="recent-epi-container">
      <div className="recent-epi-title">
        최근 작성한 원고 목록
      </div>

      {recentEpisodes.length > 0 ? (
        <div className="recent-epi-list">
          {recentEpisodes.map((episode) => (
            <RecentEpiItem
              key={episode.id}
              episode={episode}
              userId={user.id}
              ManuId={episode.manuscript_id}
            />
          ))}
        </div>
      ) : (
        <p className="recent-epi-empty">
          최근 작성한 원고가 없습니다. <br />
          먼저 원고집을 추가해주시고 그 안에 원고를 추가해주세요.
        </p>
      )}
    </div>
  );
};

export default RecentEpiSet;
