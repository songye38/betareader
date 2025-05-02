import React from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기
import useSliderStore from '@/store/useSliderStore';
import { useRouter } from 'next/router';
import useTabStore from '@/store/useTabStore';
import useEpisodeForm from '@/hooks/useEpisode';
import useAuthStore from '@/store/useAuthStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import { useFeedback } from '@/hooks/useFeedback';
import useNotifications from '@/hooks/useNotification';

// dayjs에 상대 시간 플러그인 사용
dayjs.extend(relativeTime);

// dayjs에 한국어 로케일 설정
dayjs.locale('ko');


const AlarmItem = ({ message, timeAgo, manuId, tabId, notiId, isNew,notiType }) => {
    const { markNotificationAsReadById } = useNotifications();
    const { setManuscript } = useManuscriptStore(); // 원고 상태 업데이트 함수 가져오기
    const { user } = useAuthStore(); // 로그인된 유저 정보 가져오기
    const { fetchEpisodesByManuId } = useEpisodeForm();
    const { resetTabs, setTabs } = useTabStore();
    const router = useRouter();
    const relativeTimeDisplay = dayjs(timeAgo).fromNow();
    const { activeRound } = useSliderStore();


    const handleClick = async () => {

        if (!(user.id && manuId && tabId && notiId)) {
            console.error('필수 파라미터가 부족합니다.', { userId: user.id, manuId, tabId, notiId });
            return;
          }





        if (user.id && manuId && tabId && notiId) {
          const episodes = await fetchEpisodesByManuId(user.id, manuId);
          console.log("episodes", episodes);
      
          resetTabs();
          setManuscript({ id: manuId });
      
          setTabs(episodes, tabId);
          await new Promise(resolve => setTimeout(resolve, 0));
      
          const selectedTab = useTabStore.getState().selectedTab;
          console.log("selectedTab", selectedTab);
      
          if (!selectedTab) {
            console.error('selectedTab is undefined');
            return;
          }
      
          useSliderStore.getState().setActiveSlider('feedback');
          useSliderStore.getState().setActiveRound(selectedTab?.current_session_order);
          console.log("activeRound", selectedTab?.current_session_order);
      
          await markNotificationAsReadById(notiId);
      
          if (selectedTab.tab_id) {
            router.push(`/manu/${manuId}?tab=${selectedTab.tab_id}`);
          } else {
            console.error('selectedTab.tab_id is missing');
          }
        }
      };
      
    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#3A3B41',
                padding: '12px 16px',
                borderRadius: '12px',
                gap: '12px',
                cursor: 'pointer',
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid #52545A',
                transition: 'background 0.2s ease-in-out',
            }}
        >
            <img
                src={notiType === 'Comment' ? '/notification-text.svg' : '/insight_icon.svg'}
                alt="알림"
                width={24}
                height={24}
                style={{ flexShrink: 0 }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span
                    style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontFamily: 'Pretendard',
                        fontWeight: 500,
                        lineHeight: '20px',
                        marginBottom: '2px',
                    }}
                >
                    <b>{message}</b>
                </span>
                <div style={{ display: 'flex', gap: '4px', flexDirection: 'row', alignItems: 'center' }}>
                    {isNew && (
                        <span
                            style={{
                                color: '#B0B0B0',
                                fontSize: '12px',
                                fontFamily: 'Pretendard',
                                lineHeight: '16px',
                            }}
                        >
                            새로운 댓글
                        </span>
                    )}
                    <span
                        style={{
                            color: '#B0B0B0',
                            fontSize: '12px',
                            fontFamily: 'Pretendard',
                            lineHeight: '16px',
                        }}
                    >
                        {relativeTimeDisplay}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AlarmItem;
