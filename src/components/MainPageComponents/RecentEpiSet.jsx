import React, { useEffect } from 'react';
import RecentEpiItem from './RecentEpiItem';
import useEpisodeForm from '@/hooks/useEpisode';
import useAuthStore from '@/store/useAuthStore';

const RecentEpiSet = () => {
  // useEpisodeForm 훅에서 필요한 데이터를 가져옵니다.
  const { recentEpisodes = [], fetchRecentEpisodes } = useEpisodeForm();
  const { user } = useAuthStore(); // 로그인된 유저 정보 가져오기
  console.log("recentEpisodes", recentEpisodes);
  console.log("user", user);


  useEffect(() => {
    if (!user || !user.id) return;
    console.log("RecentEpiSet user.id", user.id);
    fetchRecentEpisodes(user.id);
  }, [user?.id]);

  console.log("recentEpisodes", recentEpisodes);

  return (
    <div
      style={{
        width: '1152px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#1E1F24',
        borderRadius: '32px',
        overflowX: 'auto', // 가로 스크롤 활성화
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 24,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        최근 작성한 원고 목록
      </div>

      {/* 최근 에피소드가 있을 때만 표시 */}
      {recentEpisodes.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            overflowX: 'auto', // 가로 스크롤 활성화
            paddingBottom: '10px', // 스크롤바가 겹치는 걸 방지하기 위한 여백
          }}
        >
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
        <p style={{ color: 'gray', textAlign: 'center' }}>
          최근 작성한 원고가 없습니다. <br />
          먼저 원고집을 추가해주시고 그 안에 원고를 추가해주세요.
        </p>
      )}
    </div>
  );
};

export default RecentEpiSet;
