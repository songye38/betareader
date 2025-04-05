import React, { useEffect, useState } from 'react';
import RecentEpiItem_mini from './RecentEpiItem_mini';
import AddEpiBtn from '../Buttons/AddEpiBtn';
// import useEpisodeForm from '@/hooks/useEpisode';
// import useAuthStore from '@/store/useAuthStore';

const mockEpisodes = [
  {
    id: '1',
    title: '1화: 운명의 만남',
    summary: '주인공이 낯선 도시에서 의문의 인물을 만난다.',
    updatedAt: '2024-03-01',
    tab_no :'제목이 길어지면?'
  },
  {
    id: '2',
    title: '2화: 그림자 속 비밀',
    summary: '숨겨진 과거의 단서가 드러난다.',
    updatedAt: '2024-03-05',
    tab_no:'1'
  },
  {
    id: '3',
    title: '3화: 결정의 시간',
    summary: '중대한 선택 앞에 선 주인공.',
    updatedAt: '2024-03-10',
    tab_no : '2'
  },
];

const RecentEpiSet_test = () => {
  const [recentEpisodes, setRecentEpisodes] = useState([]);

  // useEffect로 mock 데이터 설정
  useEffect(() => {
    setTimeout(() => {
      setRecentEpisodes(mockEpisodes); // 0.5초 후 임시 데이터 세팅 (시각적 테스트용)
    }, 500);
  }, []);

  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#1E1F24',
        borderRadius: '32px',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        전체 원고
      </div>



      <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
        {/* AddEpiBtn도 동일한 1/4 비율로 감싸줌 */}
        <div style={{ flex: '1 1 calc(25% - 18px)' }}>
          <AddEpiBtn />
        </div>

        {/* 나머지 3개 RecentEpiItem_mini들 */}
        {recentEpisodes.slice(0, 3).map((episode) => (
          <div
            key={episode.id}
            style={{ flex: '1 1 calc(25% - 18px)' }}
          >
            <RecentEpiItem_mini episode={episode} />
          </div>
        ))}
      </div>

      


    </div>
  );
};

export default RecentEpiSet_test;
