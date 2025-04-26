import supabase from '@/supabase/supabaseClient';

export const subscribeToNotifications = (userId, onNewNotification, onError) => {
    const channel = supabase
        .channel('notifications-channel')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`,
            },
            (payload) => {
                console.log('새 알림 도착:', payload.new);
                if (onNewNotification) onNewNotification(payload.new); // 💡 콜백 호출
            }
        )
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('알림 구독 시작됨!');
            } else if (status === 'CHANNEL_ERROR' && onError) {
                onError('알림 구독 실패!');
            }
        });

    return () => {
        supabase.removeChannel(channel);
    };
};

/**
 * 알림을 읽음 처리하는 함수
 * @param {string} notificationId - 알림의 UUID
 * @returns {Promise<boolean>} - 성공 여부 반환
 */
export const markNotificationAsRead = async (notificationId) => {
    console.log("🔔 알림 읽음 처리 시작:", notificationId);

    try {
        const { error } = await supabase
            .from("notifications")
            .update({ read: true })
            .eq("id", notificationId);

        if (error) {
            console.error("❌ 알림 읽음 처리 실패:", error.message);
            return false;
        }

        console.log("✅ 알림 읽음 처리 완료");
        return true;
    } catch (err) {
        console.error("예외 발생:", err.message);
        return false;
    }
};
