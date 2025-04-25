import { useEffect, useState, useCallback } from 'react';
import { subscribeToNotifications } from '@/models/notificationModel';
import supabase from '@/supabase/supabaseClient';

const useNotifications = (userId) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ 외부에서 호출 가능한 fetch 함수로 바꿈
    const fetchInitialNotifications = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setNotifications(data);
        }
        setLoading(false);
    }, [userId]);

    // ✅ 컴포넌트 마운트시 최초 1회만 호출
    useEffect(() => {
        fetchInitialNotifications();
    }, [fetchInitialNotifications]);

    // ✅ 실시간 알림 구독
    useEffect(() => {
        if (!userId) return;

        const handleNewNotification = (newNotification) => {
            const enhanced = { ...newNotification, isNew: true };
            setNotifications((prev) => [enhanced, ...prev]);
        };

        const handleError = (err) => {
            setError(err);
        };

        const unsubscribe = subscribeToNotifications(
            userId,
            handleNewNotification,
            handleError
        );

        return () => {
            unsubscribe();
        };
    }, [userId]);

    // ✅ fetchInitialNotifications도 리턴에 포함
    return { notifications, loading, error, refetch: fetchInitialNotifications };
};

export default useNotifications;
