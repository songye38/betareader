import { useState } from 'react';
import { fetchInsightsByEpisodeId } from '@/models/insightModel';
import { captureException } from '@sentry/react'; // Sentry로 에러 전송

export const useInsight = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [insightsBySession, setInsightsBySession] = useState({});


    const handleError = (error, customMessage) => {
        setError(error.message || customMessage);
        captureException(error);  // Sentry에 에러 전송
        console.error(customMessage, error); // 콘솔에도 에러 출력
    };

    const loadInsightsByEpisodeId = async (episodeId) => {
        if (!episodeId) return;
        setLoading(true);
        setError(null);

        try {
            const grouped = await fetchInsightsByEpisodeId(episodeId);
            setInsightsBySession(grouped || {});
        } catch (err) {
            handleError(err, "세션별 인사이트 로딩 실패");
        } finally {
            setLoading(false);
        }
    };

    return {
        loadInsightsByEpisodeId,
        loading,
        error,
        insightsBySession,
    };
};
