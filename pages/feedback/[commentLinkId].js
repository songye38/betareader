import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CommentComponent from '@/components/CommentComponents/CommentComponent';
import CommentHeaderComponent from '@/components/CommentComponents/CommentHeaderComponent';
import CommentInputSection from '@/components/CommentComponents/CommentInputSection';
import { useFeedback } from '@/hooks/useFeedback'; // 훅 import

const CommentPage = () => {
  const router = useRouter();
  const { commentLinkId: linkId } = router.query;

  const { checkExpired, loading,comments,loadCommentsFromServer } = useFeedback();
  const [expired, setExpired] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);


    useEffect(() => {
        if (!linkId) return;
        loadCommentsFromServer(linkId);
    }, [linkId]);


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
  }, [router.isReady, linkId,router.asPath,checkExpired]);
  


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
      <CommentHeaderComponent
        episodeTitle = {"원고집 제목"}
        manuscriptTitle = {"원고 제목"}
        author={"작가 이름"}
       />
      <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // 위에서부터 차지하도록 설정
                alignItems: 'center',
                gap: '15px',
                width: '100%',
                minHeight: '100vh', // 최소 높이를 100vh로 설정
                paddingTop: '10px', // 위쪽 여백
                overflowY: 'auto', // 내용이 넘칠 경우 스크롤바 표시
            }}
            >
            {comments.map((comment) => (
                <CommentComponent
                key={comment.id}
                id={comment.id}
                name={comment.name}
                text={comment.content}
                />
            ))}
        </div>



      {router.isReady && linkId && (
         <CommentInputSection 
            createdAt={createdAt} 
            linkId={linkId} 
            onCommentAdded={() => loadCommentsFromServer(linkId)}  
        />
        )}
    </div>
  );
};

export default CommentPage;
