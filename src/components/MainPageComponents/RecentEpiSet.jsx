import React, { useEffect } from 'react';
import RecentEpiItem from './RecentEpiItem';
import useEpisodeForm from '@/hooks/useEpisode';
import useAuthStore from '@/store/useAuthStore';
import styles from './RecentEpiSet.module.css'; // CSS 모듈 임포트

const RecentEpiSet = () => {
  const { recentEpisodes, fetchRecentEpisodes } = useEpisodeForm();
  const { user, profile } = useAuthStore();

  useEffect(() => {
    if (!user?.id || !profile?.username) return;

    fetchRecentEpisodes(user.id);
    console.log("RecentEpiSet -> user.id", user.id);
  }, [user?.id, profile?.username]);















  return (
    <div className={styles.recentEpiContainer}>
      <div className={styles.recentEpiTitle}>
        최근 작성한 원고 목록
      </div>

      {recentEpisodes.length > 0 ? (
        <div className={styles.recentEpiList}>
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
        <p className={styles.recentEpiEmpty}>
          최근 작성한 원고가 없습니다. <br />
          먼저 원고집을 추가해주시고 그 안에 원고를 추가해주세요.
        </p>
      )}
    </div>
  );
};

export default RecentEpiSet;
