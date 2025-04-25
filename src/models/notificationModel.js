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
