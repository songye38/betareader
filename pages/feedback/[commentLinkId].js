import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CommentComponent from '@/components/CommentComponents/CommentComponent';
import CommentHeaderComponent from '@/components/CommentComponents/CommentHeaderComponent';
import CommentInputSection from '@/components/CommentComponents/CommentInputSection';
import { useFeedback } from '@/hooks/useFeedback'; // 훅 import

const CommentPage = () => {
  const router = useRouter();
  const { commentLinkId: linkId } = router.query;

  const { checkExpired, loading } = useFeedback();
  const [expired, setExpired] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, isHearted: false, name: '박송이', text: '너무 좋아요' },
    { id: 2, isHearted: false, name: '박재현', text: '음 별로네요' },
    { id: 3, isHearted: false, name: '박장희', text: '킹크랩 너무 맛있겠다.' },
  ]);

  useEffect(() => {
    if (!router.isReady || !linkId){
        console.log("linkid",linkId)
        console.error('링크 ID가 없습니다.');
        return;
    }
  
    const check = async () => {
      const { expired, created_at } = await checkExpired(linkId);
  
      if (expired) {
        setExpired(true);
      } else {
        setExpired(false);
        setCreatedAt(created_at);
      }
    };
  
    check();
  }, [router.isReady, linkId,router.asPath]);
  


  if (expired) {
    return <div style={{ padding: '32px', textAlign: 'center', fontSize: '20px' }}>⏰ 이 링크는 만료되었습니다.</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CommentHeaderComponent />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
          width: '100%',
          paddingTop: '140px',
        }}
      >
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            id={comment.id}
            name={comment.name}
            text={comment.text}
          />
        ))}
      </div>



      {router.isReady && linkId && (
         <CommentInputSection createdAt={createdAt} linkId={linkId} />
        )}
    </div>
  );
};

export default CommentPage;
