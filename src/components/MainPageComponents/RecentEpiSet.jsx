import React from 'react';
import RecentEpiItem from './RecentEpiItem';

const RecentEpiSet = ({ episodes = [] }) => {
  return (
    <div style={{
        width: '1152px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#1E1F24',
        borderRadius: '32px',
    }}>
      <div 
        style={{
          color: 'white', 
          fontSize: 24, 
          fontFamily: 'Pretendard', 
          fontWeight: '700', 
          lineHeight: '33.60px', 
          wordWrap: 'break-word'
        }}
      >
        최근 작성한 원고
      </div>

      {/* 에피소드가 있을 때만 표시 */}
      {episodes.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
          {episodes.map((episode) => (
            <RecentEpiItem key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'gray', textAlign: 'center' }}>최근 작성한 원고가 없습니다.</p>
      )}
    </div>
  );
};

export default RecentEpiSet;
