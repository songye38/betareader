import React from 'react';
import { useRouter } from 'next/router'; // useRouter import
import useAuthStore from '@/store/useAuthStore';
import supabase from '@/supabase/supabaseClient';
import { useState, useEffect } from 'react';
import AlarmItem from './AlarmItem';
import useNotifications from '@/hooks/useNotification';
import useGlobalClickClose from '@/hooks/useGlobalClickClose'; // ✅ useGlobalClickClose import

const MyPageModal = ({ onClose, username }) => {
    const logout = useAuthStore((state) => state.logout);
    const profile = useAuthStore((state) => state.profile);
    const { user } = useAuthStore(); // 로그인된 유저 정보 가져오기
    const { notifications, loading, error } = useNotifications(user.id);
    const router = useRouter(); // useRouter 훅 사용
    const [avatarUrl, setAvatarUrl] = useState(undefined);

    console.log("notifications", notifications);
    const modalRef = useGlobalClickClose(true, onClose); // 🔥 모달 열려있다고 설정

    useEffect(() => {
        if (profile?.avatar_url !== undefined) {
            setAvatarUrl(profile.avatar_url || null); // 없으면 null로 명시
        }
    }, [profile]);


    const handleNavigation = (path) => {
        router.push(path); // 경로 이동
        onClose(); // 모달 닫기
    };


    const handleLogout = async () => {
        console.log("로그아웃 클릭");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("로그아웃 오류:", error.message);
        } else {
            logout(); // Zustand 상태 초기화
        }
    };


    return (
        <div
            ref={modalRef}
            style={{
                width: 345,
                height: 'auto',
                padding: 32,
                background: '#2C2D34',
                borderRadius: 24,
                border: '1px #606575 solid',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 12,
                display: 'inline-flex'
            }}
        >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1.2px solid #636466' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <img
                        src={avatarUrl === undefined ? "/default_user_profile_img.png" : (avatarUrl || "/default_user_profile_img.png")}
                        alt="Profile"
                        width={48}
                        height={48}
                        onClick={() => handleNavigation('/mypage/profile')}
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <div style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'Pretendard',
                        fontWeight: '600',
                        lineHeight: '28px',
                        wordWrap: 'break-word'
                    }}>
                        {/* 나중에 사용자 닉네임이 와야함 */}
                        {username}

                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0px' }}>
                    {/* 내 정보 수정하기 */}
                    <div style={{
                        display: 'inline-flex',          // flexbox로 변경
                        alignItems: 'center',           // 수직 중앙 정렬
                        justifyContent: 'center',       // 수평 중앙 정렬
                        padding: '6px',                 // 아이콘과 border 사이의 간격
                        // border: '1px solid #636466',    // border 설정 (원하는 색상, 두께로 조정 가능)
                        borderRadius: '12px',           // 둥근 테두리 (원 모양으로 만들기 위한 설정)
                        boxSizing: 'border-box'         // border가 이미지 크기에 영향을 미치지 않도록 설정
                    }}>
                        <img src="/write_icon.svg" alt="Profile" width={24} height={24} onClick={() => handleNavigation('/mypage/profile')} />

                    </div>
                    {/* 로그아웃 */}
                    <div
                        onClick={handleLogout}
                        style={{
                            display: 'inline-flex',          // flexbox로 변경
                            alignItems: 'center',           // 수직 중앙 정렬
                            justifyContent: 'center',       // 수평 중앙 정렬
                            padding: '6px',                 // 아이콘과 border 사이의 간격
                            borderRadius: '12px',           // 둥근 테두리 (원 모양으로 만들기 위한 설정)
                            boxSizing: 'border-box'         // border가 이미지 크기에 영향을 미치지 않도록 설정
                        }}>
                        <img src="/logout_icon.svg" alt="Profile" width={24} height={24} />
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxHeight: '200px', // ✅ 최대 높이 설정
                    overflowY: 'auto',  // ✅ 세로 스크롤 활성화
                    scrollbarWidth: 'none',        // Firefox
                    msOverflowStyle: 'none',       // IE 10+
                }}
            >
                {notifications.length === 0 ? (
                    <div style={{ color: 'white', fontSize: '16px', fontWeight: '500', textAlign: 'center' }}>
                        모든 알람을 확인했습니다.
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <AlarmItem
                            notiType={notification.type}
                            key={notification.id}
                            notiId={notification.id}
                            manuId={notification.manuscript_id}
                            tabId={notification.tab_id}
                            message={notification.message}
                            timeAgo={notification.created_at} // 생성 시점으로부터 경과한 시간
                            isNew={notification.isNew} // ✅ 요거!
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPageModal;
