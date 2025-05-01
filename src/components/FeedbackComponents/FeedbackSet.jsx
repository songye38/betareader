import React from 'react';
import FeedbackItem from './FeedbackItem'; // 실제 경로에 맞게 조정해줘



const FeedbackSet = ({ round, commentsBySession,comments = [], loading = false }) => {

  console.log("comments",comments);
  const formatDate = (timestamp) => timestamp.slice(0, 10);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          fontFamily: 'Pretendard',
          marginBottom: '8px',
        }}
      >
        피드백
      </div>

      {loading ? (
        <div style={{ color: '#aaa', fontSize: '14px' }}>💬 피드백을 불러오는 중입니다...</div>
      ) : comments.length === 0 ? (
        <div style={{ color: '#aaa', fontSize: '14px' }}>아직 등록된 피드백이 없습니다.</div>
      ) : (
        comments.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            username={feedback.name || '익명'}
            content={feedback.content}
            timestamp={formatDate(feedback.created_at)} // 필요한 경우 포맷 변경
          />
        ))

        
      )}
    </div>
  );
};

export default FeedbackSet;
