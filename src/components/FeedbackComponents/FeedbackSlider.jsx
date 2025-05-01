import React, { useState, useMemo } from 'react';
import FeedbackSet from './FeedbackSet';
import InsightSet from './InsightSet';
import { useEffect } from 'react';
import { useFeedback } from '@/hooks/useFeedback';
import useTabStore from '@/store/useTabStore';
import { useInsight } from '@/hooks/useInsight';

const MAIN_PURPLE = '#8B5CF6'; // 메인 보라색

const MAX_FREE_ROUNDS = 3;
const MAX_PREMIUM_ROUNDS = 5; // 예시
const MEMBERSHIP_ENABLED = true;

const FeedbackSlider = ({ isVisible, onClose, isPremiumUser = false }) => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const [activeRound, setActiveRound] = useState(1);
  const {
    loadCommentsByEpisodeId,
    commentsBySession,
    loading: commentsLoading,
  } = useFeedback();

  const {
    loadInsightsByEpisodeId,
    insightsBySession,
    loading: insightsLoading,
  } = useInsight();

  console.log("insightsBySession", insightsBySession);

  // 여기서 합치기!
  const isLoading = useMemo(() => {
    return commentsLoading || insightsLoading;
  }, [commentsLoading, insightsLoading]);




  const totalRounds = isPremiumUser ? MAX_PREMIUM_ROUNDS : MAX_FREE_ROUNDS;

  // roundStates를 만들면서 동시에 usedRounds 계산
  let usedRounds = 0;

  const roundStates = Array.from({ length: totalRounds }, (_, i) => {
    const round = i + 1;
    const session = commentsBySession[round];

    if (session) {
      usedRounds += 1; // 세션이 존재하면 사용된 라운드 수 증가
      return {
        round,
        status: session.expired ? '완료' : '진행중',
      };
    } else {
      return {
        round,
        status: '미진행',
      };
    }
  });



  useEffect(() => {
    if (selectedTab.id) {
      loadCommentsByEpisodeId(selectedTab.id);
      loadInsightsByEpisodeId(selectedTab.id);
      console.log("commentsBySession", commentsBySession);
    }
  }, [selectedTab.id]);


  if (!isVisible) return null;



  const renderTab = ({ round, status }) => (
    <button
      key={round}
      onClick={() => setActiveRound(round)}
      style={{
        flex: 1,
        padding: '8px 12px',
        backgroundColor: 'transparent',
        color: activeRound === round ? '#fff' : '#aaa',
        border: 'none',
        borderBottom: activeRound === round ? `2px solid ${MAIN_PURPLE}` : '2px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '14px',
        transition: 'color 0.2s ease',
      }}
    >
      <span>{round}회차</span>
      <span style={{ fontSize: '12px', color: '#888' }}>{status}</span>
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          backgroundColor: '#1A1B1F',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflowY: 'auto',
          gap: '24px',
        }}
      >
        {/* 회차 정보 요약 + 멤버십 유도 */}
        <div
          style={{
            backgroundColor: '#2A2B2F',
            padding: '12px 16px',
            borderRadius: '8px',
            color: '#eee',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            📝 사용 가능 회차: {totalRounds - usedRounds} / {totalRounds}
            {MEMBERSHIP_ENABLED && !isPremiumUser && (
              <div style={{ fontSize: '12px', marginTop: '4px', color: '#ccc' }}>
                🎁 멤버십 가입 시 <span style={{ color: MAIN_PURPLE }}>+{MAX_PREMIUM_ROUNDS - MAX_FREE_ROUNDS}회</span> 추가 제공!
              </div>
            )}
          </div>
          {MEMBERSHIP_ENABLED && !isPremiumUser && (
            <button
              onClick={() => alert('멤버십 페이지로 이동')}
              style={{
                backgroundColor: MAIN_PURPLE,
                border: 'none',
                color: '#fff',
                padding: '6px 12px',
                fontSize: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#7C4DFF')}
              onMouseOut={(e) => (e.target.style.backgroundColor = MAIN_PURPLE)}
            >
              가입하기
            </button>
          )}
        </div>

        {/* 탭 메뉴 */}
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          {roundStates.map(renderTab)}
        </div>

        {/* 현재 회차에 맞는 섹션 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <FeedbackSet round={activeRound} comments={commentsBySession[activeRound]?.comments || []} loading={commentsLoading} />
          <InsightSet round={activeRound} insights={insightsBySession[activeRound]?.insights || []} loading={insightsLoading} />

        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;
