import React from 'react';
import FeedbackSet from './FeedbackSet';
import InsightSet from './InsightSet';


const FeedbackSlider = ({isVisible,onClose}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: '#1A1B1F',
        boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.4)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        overflowY: 'auto',
        gap: '32px',
      }} 
    >
      {/* 피드백 섹션 */}
      <FeedbackSet />

      {/* 인사이트 섹션 */}
      <InsightSet />
    </div>
  );
};

export default FeedbackSlider;
