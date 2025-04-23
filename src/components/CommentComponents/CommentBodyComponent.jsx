import React from 'react';

const CommentBodyComponent = ({ content }) => {
    console.log("CommentBodyComponent -> content", content);
  return (
    <div
      style={{
        // backgroundColor: '#1F2024',
        padding:'120px',
        color: '#F0F0F0',
        borderRadius: '12px',
        
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '18px',
        lineHeight: '1.8',
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
      }}
    >
      {content}
    </div>
  );
};

export default CommentBodyComponent;
