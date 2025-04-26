import { useEffect, useState, useCallback } from 'react';
import { subscribeToNotifications,markNotificationAsRead } from '@/models/notificationModel';
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
            .eq('read', false) 
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

        /**
     * 알림을 읽음 처리합니다.
     * @param {string} notificationId - 알림 UUID
     * @returns {Promise<boolean>} - 성공 여부 반환
     */
    const markNotificationAsReadById = async (notificationId) => {
        setLoading(true);
        setError(null);

        try {
            const result = await markNotificationAsRead(notificationId);
            if (result) {
                console.log("알림이 읽음 처리되었습니다.");
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

    // ✅ fetchInitialNotifications도 리턴에 포함
    return { notifications, loading, error, refetch: fetchInitialNotifications,markNotificationAsReadById };
};

export default useNotifications;
