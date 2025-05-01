import { useEffect, useState, useCallback } from 'react';
import { subscribeToNotifications, markNotificationAsRead } from '@/models/notificationModel';
import supabase from '@/supabase/supabaseClient';

const useNotifications = (userId) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasUnread, setHasUnread] = useState(false); // 👈 추가!

    // ✅ 외부 호출용
    const fetchInitialNotifications = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .eq('read', false)
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setNotifications(data);
            setHasUnread(data.length > 0); // 👈 읽지 않은 알림 있는지 체크
        }
        setLoading(false);
    }, [userId]);

    useEffect(() => {
        fetchInitialNotifications();
    }, [fetchInitialNotifications]);

    useEffect(() => {
        if (!userId) return;

        const handleNewNotification = (newNotification) => {
            const enhanced = { ...newNotification, isNew: true };
            setNotifications((prev) => [enhanced, ...prev]);
            setHasUnread(true); // 👈 새 알림 오면 무조건 빨간점 표시
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

    const markNotificationAsReadById = async (notificationId) => {
        setLoading(true);
        setError(null);

        try {
            const result = await markNotificationAsRead(notificationId);
            if (result) {
                console.log("알림이 읽음 처리되었습니다.");
                // 읽음 처리 후 다시 데이터 새로고침
                await fetchInitialNotifications();
            }
            return result;
        } catch (err) {
            console.error("❌ 알림 처리 실패:", err.message);
            setError(err.message || "알림 처리 중 오류 발생");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        notifications,
        loading,
        error,
        hasUnread, // 👈 여기를 리턴에 추가!
        refetch: fetchInitialNotifications,
        markNotificationAsReadById,
    };
};

export default useNotifications;
