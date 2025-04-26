'use client';
import React from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기
import { useRouter } from 'next/router';
import useEpisodeForm from '@/hooks/useEpisode';
import useTabStore from '@/store/useTabStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import useSliderStore from '@/store/useSliderStore';

// dayjs에 상대 시간 플러그인 사용
dayjs.extend(relativeTime);

// dayjs에 한국어 로케일 설정
dayjs.locale('ko');


const RecentEpiItem = ({ episode, userId, ManuId }) => {
  const relativeTimeDisplay = dayjs(episode.last_edited_at).fromNow();
  const { fetchEpisodesByManuId } = useEpisodeForm(); // ✅ 컴포넌트 내부에서 호출
  const router = useRouter();
  const { setTabs, resetTabs } = useTabStore();
  const setManuscript = useManuscriptStore((state) => state.setManuscript);
  const borderColor = episode.is_feedback_mode ? '#F27878' : '#6071FB'


  const handleClick = async (tab_id) => {

    if (userId && ManuId) {
      const episodes = await fetchEpisodesByManuId(userId, ManuId);
      resetTabs();
      setManuscript({ id: ManuId });

      //id를 넣으면 그 값이 selectedTab이 되고 없으면 그냥 첫번째걸 활성화
      setTabs(episodes, tab_id);
      const selectedTab = useTabStore.getState().selectedTab;
      if (episode.is_feedback_mode) {
        useSliderStore.getState().setActiveSlider('feedback');
      }
      router.push(`/manu/${ManuId}?tab=${selectedTab.tab_id}`);

    }
  };


  return (
    <div
      onClick={() => handleClick(episode.tab_id)}
      style={{
        width: 258,
        height: 162,
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 24,
        paddingBottom: 24,
        background: '#2C2D34',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px #4A4E5B solid',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        display: 'inline-flex',
        cursor: 'pointer',
      }}
    >

      {/* 상단 내용: 제목과 시간 */}
      <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <div
          style={{
            color: 'white',
            fontSize: 12,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '16.80px',
            wordWrap: 'break-word'
          }}
        >
          {episode.manuscript.title} {/* 동적으로 제목 설정 */}
        </div>

        <div
          style={{
            color: '#7B8091',
            fontSize: 12,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '16.80px',
            wordWrap: 'break-word'
          }}
        >
          {relativeTimeDisplay} {/* 동적으로 시간 설정 (ex. "1시간 전") */}
        </div>
      </div>

      {/* 하단 내용: 화 제목과 내용 */}
      <div
        style={{
          alignSelf: 'stretch',
          height: 85,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 8,
          display: 'flex'
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 18,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '28px',
            wordWrap: 'break-word'
          }}
        >
          {episode.title}
          {/* {episode.tab_no}화 동적으로 화 번호 설정 */}
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            height: '61px',
            color: '#989DAF',
            fontSize: 16,
            fontFamily: 'Pretendard',
            fontWeight: '400',
            lineHeight: '22.40px',
            wordWrap: 'break-word',
            display: '-webkit-box',         // flexbox 형태로 처리
            overflow: 'hidden',             // 넘치는 부분 숨기기
            WebkitBoxOrient: 'vertical',    // 수직 정렬로 설정
            WebkitLineClamp: 2,             // 2줄까지만 표시
            textOverflow: 'ellipsis',       // 넘칠 경우 말줄임표(...)
          }}
        >
          {episode.content} {/* 동적으로 내용 설정 */}
        </div>
        <span
          style={{
            backgroundColor: borderColor || '#999',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px', // 필요에 따라 height 설정
          }}
        >
          {episode.is_feedback_mode ? '피드백 받는중' : '작성중'}
        </span>

      </div>
    </div>
  );
};

export default RecentEpiItem;
