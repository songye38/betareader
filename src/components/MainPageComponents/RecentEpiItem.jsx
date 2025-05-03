'use client';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useRouter } from 'next/router';
import useEpisodeForm from '@/hooks/useEpisode';
import useTabStore from '@/store/useTabStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import useSliderStore from '@/store/useSliderStore';
import './RecentEpiItem.css'; // css 파일 임포트

dayjs.extend(relativeTime);
dayjs.locale('ko');

const RecentEpiItem = ({ episode, userId, ManuId }) => {
  const relativeTimeDisplay = dayjs(episode.last_edited_at).fromNow();
  const { fetchEpisodesByManuId } = useEpisodeForm();
  const router = useRouter();
  const { setTabs, resetTabs } = useTabStore();
  const setManuscript = useManuscriptStore((state) => state.setManuscript);
  const borderColor = episode.is_feedback_mode ? '#F27878' : '#6071FB';

  const handleClick = async (tab_id) => {
    if (!(userId && ManuId)) {
      console.error('필수 파라미터가 부족합니다.', { userId, ManuId });
      return;
    }

    const episodes = await fetchEpisodesByManuId(userId, ManuId);
    resetTabs();
    setManuscript({ id: ManuId });
    setTabs(episodes, tab_id);
    const selectedTab = useTabStore.getState().selectedTab;
    if (episode.is_feedback_mode) {
      useSliderStore.getState().setActiveSlider('feedback');
    }
    if (selectedTab.tab_id) {
      router.push(`/manu/${ManuId}?tab=${selectedTab.tab_id}`);
    } else {
      console.error('selectedTab.tab_id is missing');
    }
  };

  return (
    <div className="recent-epi-item" onClick={() => handleClick(episode.tab_id)}>
      {/* 상단: 제목 + 시간 */}
      <div className="recent-epi-top">
        <div className="recent-epi-top-title">{episode.title}</div>
        <div className="recent-epi-top-time">{relativeTimeDisplay}</div>
      </div>

      {/* 하단: 화 제목 + 내용 + 상태 */}
      <div className="recent-epi-bottom">
        <div className="recent-epi-bottom-title">{episode.title}</div>
        <div className="recent-epi-bottom-content">{episode.content}</div>
        <span
          className="recent-epi-status"
          style={{ backgroundColor: borderColor }}
        >
          {episode.is_feedback_mode ? '피드백 받는중' : '작성중'}
        </span>
      </div>
    </div>
  );
};

export default RecentEpiItem;
