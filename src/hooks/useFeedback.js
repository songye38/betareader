import { useState, useCallback } from 'react';
import { checkAndUpdateExpiredStatus, saveComment, fetchComments, createCommentLink, fetchLinkInfo, fetchCommentsByEpisodeId } from '@/models/feedbackModel';
import { toast } from "react-toastify";
import { captureException } from '@sentry/react'; // Sentry로 에러 전송

export const useFeedback = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [info, setInfo] = useState(null);
    const [commentsBySession, setCommentsBySession] = useState({});

    const handleError = (error, customMessage) => {
        setError(error.message || customMessage);
        captureException(error);  // Sentry에 에러 전송
        console.error(customMessage, error); // 콘솔에도 에러 출력
    };

    const addCommentLink = async (episodeId, minRequiredComments, userId) => {
        setLoading(true);
        setError(null);
        try {
            const newLink = await createCommentLink(episodeId, minRequiredComments, userId);
            return newLink;
        } catch (err) {
            handleError(err, '댓글 링크 생성 실패');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const checkExpired = async (linkId) => {
        setLoading(true);
        setError(null);

        try {
            console.log("1. checkExpired 호출됨, linkId:", linkId);
            const result = await checkAndUpdateExpiredStatus(linkId);

            if (!result) {
                console.error("checkAndUpdateExpiredStatus에서 반환된 값이 없습니다.");
                return { expired: true };
            }

            console.log("2. checkExpired → result:", result);
            return result;

        } catch (err) {
            handleError(err, "링크 만료 확인 실패");
            return { expired: true };
        } finally {
            setLoading(false);
        }
    };

    const saveCommentToServer = async (commentData) => {
        setLoading(true);
        setError(null);

        try {
            const savedComment = await saveComment(commentData);
            return savedComment;
        } catch (err) {
            handleError(err, "댓글 저장 실패");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const loadCommentsFromServer = async (linkId) => {
        if (!linkId) return;

        setLoading(true);
        setError(null);

        try {
            const fetched = await fetchComments(linkId);
            setComments(fetched || []);
        } catch (err) {
            handleError(err, "댓글 로드 실패");
        } finally {
            setLoading(false);
        }
    };

    const loadInfoFromServer = useCallback(async (linkId) => {
        if (!linkId) return;

        setLoading(true);
        setError(null);

        try {
            const data = await fetchLinkInfo(linkId);
            setInfo(data || null);
        } catch (err) {
            handleError(err, "링크 정보 로드 실패");
        } finally {
            setLoading(false);
        }
    }, []);

    const loadCommentsByEpisodeId = async (episodeId) => {
        if (!episodeId) return;

        setLoading(true);
        setError(null);

        try {
            const grouped = await fetchCommentsByEpisodeId(episodeId);
            setCommentsBySession(grouped || {});
        } catch (err) {
            handleError(err, "세션별 댓글 로딩 실패");
        } finally {
            setLoading(false);
        }
    };

    return {
        addCommentLink,
        checkExpired,
        loading,
        error,
        saveCommentToServer,
        loadCommentsFromServer,
        comments,
        loadInfoFromServer,
        info,
        loadCommentsByEpisodeId,
        commentsBySession,
    };
};
