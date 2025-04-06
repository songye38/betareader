'use client';
import FeedbackSet from "@/components/FeedbackComponents/FeedbackSet";
import InsightSet from "@/components/FeedbackComponents/InsightSet";


const FeedbackPage = () => {
    return (
        <div style={{ marginTop: '80px' }}>
          <h1 style={{ color: 'white', textAlign: 'center', fontFamily: 'Pretendard' }}>
            📬 피드백 모아보기
          </h1>
          <FeedbackSet />
          <InsightSet />
        </div>
      );
};

export default FeedbackPage;
