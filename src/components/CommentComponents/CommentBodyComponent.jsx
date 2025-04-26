import React from 'react';

const CommentBodyComponent = ({ content }) => {

  return (
    <div
      style={{
        padding:'120px',
        color: '#F0F0F0',
        borderRadius: '12px',
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
