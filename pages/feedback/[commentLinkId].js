import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs'; // ✅ Sentry 추가
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
        info,
        error
    } = useFeedback();

    const [expired, setExpired] = useState(false);
    const [createdAt, setCreatedAt] = useState(null);

    useEffect(() => {
        if (!linkId) return;

        const loadData = async () => {
            try {
                await loadCommentsFromServer(linkId);
                await loadInfoFromServer(linkId);
            } catch (error) {
                console.error("❌ 댓글/정보 불러오기 실패:", error);
                Sentry.captureException(error, {
                    contexts: {
                        page: "CommentPage",
                        phase: "load comments and info",
                        linkId: linkId,
                    },
                });
            }
        };

        loadData();
    }, [linkId]);

    useEffect(() => {
        if (!router.isReady || !linkId) return;

        const check = async () => {
            try {
                const { expired, created_at } = await checkExpired(linkId);
                setExpired(expired);
                if (!expired) setCreatedAt(created_at);
            } catch (error) {
                console.error("❌ 만료 체크 실패:", error);
                Sentry.captureException(error, {
                    contexts: {
                        page: "CommentPage",
                        phase: "check link expired",
                        linkId: linkId,
                    },
                });
            }
        };

        check();
    }, [router.isReady]);

    try {
        // 🔄 로딩 중이면 스피너 출력
        if (loading) return <LoadingSpinner />;
        if (error) return <div>😢 에러가 발생했습니다: error</div>;

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
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '40px',
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
    } catch (error) {
        console.error("❌ 렌더링 중 에러:", error);
        Sentry.captureException(error, {
            contexts: {
                page: "CommentPage",
                phase: "rendering",
                linkId: linkId,
            },
        });
        return (
            <div style={{ padding: '32px', textAlign: 'center', fontSize: '20px' }}>
                🚨 문제가 발생했어요. 새로고침해보세요.
            </div>
        );
    }
};

export default CommentPage;
