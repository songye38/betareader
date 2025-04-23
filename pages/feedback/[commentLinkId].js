import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CommentComponent from '@/components/CommentComponents/CommentComponent';
import CommentHeaderComponent from '@/components/CommentComponents/CommentHeaderComponent';
import CommentInputSection from '@/components/CommentComponents/CommentInputSection';
import { useFeedback } from '@/hooks/useFeedback';
import CommentBodyComponent from '@/components/CommentComponents/CommentBodyComponent';

const LoadingSpinner = () => (
  <div style={{ padding: '32px', textAlign: 'center' }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #ccc',
      borderTop: '4px solid #4F46E5',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto',
    }} />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    <div style={{ marginTop: '12px', fontSize: '16px', color: '#888' }}>
      불러오는 중이에요...
    </div>
  </div>
);

const CommentPage = () => {
  const router = useRouter();
  const { commentLinkId: linkId } = router.query;

  const {
    checkExpired,
    loading,
    comments,
    loadCommentsFromServer,
    loadInfoFromServer,
    info
  } = useFeedback();

  const [expired, setExpired] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    if (!linkId) return;
    loadCommentsFromServer(linkId);
    loadInfoFromServer(linkId);
  }, [linkId]);

  useEffect(() => {
    if (!router.isReady || !linkId) return;

    const check = async () => {
      const { expired, created_at } = await checkExpired(linkId);
      setExpired(expired);
      if (!expired) setCreatedAt(created_at);
    };

    check();
  }, [router.isReady]);

  // 🔄 로딩 중이면 스피너 출력
  if (loading) return <LoadingSpinner />;

  // ⛔️ 만료된 링크인 경우
  if (expired) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', fontSize: '20px' }}>
        ⏰ 이 링크는 만료되었습니다.
      </div>
    );
  }

  // ✅ 정상 렌더링
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden',
      }}
    >
      {info ? (
        <>
          <CommentHeaderComponent
            createdAt={createdAt}
            episodeTitle={info.episodeTitle}
            author={info.username}
          />
          <CommentBodyComponent content={info.episodeContent} />
        </>
      ) : (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          ⏳ 링크 정보를 불러오는 중이에요...
        </div>
      )}

      {router.isReady && linkId && (
        <CommentInputSection
          linkId={linkId}
          onCommentAdded={() => loadCommentsFromServer(linkId)}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '15px',
          width: '100%',
          paddingTop: '10px',
          overflowY: 'auto',
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
    </div>
  );
};

export default CommentPage;
