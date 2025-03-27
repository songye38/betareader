import { useState } from 'react';
import { useRouter } from 'next/router';
import CommentComponent from '@/components/CommentComponent';
import CommentHeaderComponent from '@/components/CommentHeaderComponent';

const CommentPage = () => {
  const router = useRouter();
  const [comments, setComments] = useState([
    { id: 1, isHearted: false,name:'박송이',text:'너무 좋아요' },
    { id: 2, isHearted: false,name:'박재현',text:'음 별로네요' },
    { id: 3, isHearted: false,name:'박장희',text:'킹크랩 너무 맛있겠다.' },
    { id: 4, isHearted: false,name:'백영숙',text:'킹크랩 좋군요' },
    { id: 5, isHearted: false,name:'조재영',text:'하하하' },
    { id: 6, isHearted: false,name:'박정현',text:'할아버지 좋아요' },
    
  ]);

  // 하트를 클릭한 컴포넌트를 위로 올리는 함수
  const handleHeartClick = (id, newHeartedState) => {
    // 하트 클릭 상태가 변하면 comments 배열에서 해당 댓글의 상태를 업데이트
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, isHearted: newHeartedState } : comment
    );

    // 하트를 클릭한 컴포넌트를 제일 위로 이동
    updatedComments.sort((a, b) => (b.isHearted ? 1 : 0) - (a.isHearted ? 1 : 0));

    setComments(updatedComments); // 상태 업데이트
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <CommentHeaderComponent />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // 수직 방향으로 정렬
          justifyContent: 'center', // 세로 방향으로 중앙 정렬
          alignItems: 'center', // 가로 방향으로 중앙 정렬
          gap: '15px',
        }}
      >
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            id={comment.id}
            isHearted={comment.isHearted}
            onHeartClick={handleHeartClick}
            name = {comment.name}
            text = {comment.text}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentPage;


