import React from 'react';
import FeedbackItem from './FeedbackItem'; // 경로는 상황에 맞게 수정해줘

const mockFeedbacks = [
  {
    id: 1,
    username: '작가지망생',
    content: '스토리 흐름이 너무 좋아요! 다음 화도 기대됩니다 🙌',
    timestamp: '5분 전',
  },
  {
    id: 2,
    username: '베타리더101',
    content: `주인공의 감정선이 조금 더 부각되면 좋을 것 같아요.  
특히 중반부에서 갈등이 깊어지는데, 그 부분을 조금 더 디테일하게 풀어주시면 몰입감이 높아질 듯!`,
    timestamp: '1시간 전',
  },
  {
    id: 3,
    username: '문학소년',
    content: '전투 장면 묘사가 진짜 박진감 넘쳐요!!',
    timestamp: '어제',
  },
];

const FeedbackSet = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '24px',
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
      {mockFeedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          username={feedback.username}
          content={feedback.content}
          timestamp={feedback.timestamp}
        />
      ))}
    </div>
  );
};

export default FeedbackSet;
