import React from 'react';

const features = [
    {
      title: '👀 BetaView',
      subtitle: '24시간 피드백 관찰',
      description: '당신의 글에 대한 독자들의 피드백을 빠르게 확인하고, AI가 그 반응을 분석해줍니다.',
    },
    {
      title: '🎯 BetaFocus',
      subtitle: '핵심 인사이트 도출',
      description: '다양한 피드백을 분석하여 핵심 인사이트를 도출하고, 글 개선에 직접 활용할 수 있도록 도와줍니다.',
    },
    {
      title: '✍️ 글쓰기 루틴',
      subtitle: '목표 기반 글쓰기',
      description: '매주 목표를 설정하고 꾸준히 글을 써보세요. 습관은 최고의 도구가 됩니다.',
    },
  ];

const WelcomeBackSection = ({ onLogin }) => {
  return (
    <div
      style={{
        padding: '64px 24px',
        maxWidth: 700,
        margin: '0 auto',
        borderRadius: 20,
        background: 'radial-gradient(circle at top left, #2D2D32, #1A1A1D)',
        color: '#FFFFFF',
        fontFamily: 'Pretendard, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 빛나는 배경 효과 */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: 300,
          height: 300,
          background: 'rgba(99,102,241,0.2)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      {/* 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* 타이틀 */}
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 20,
            background: 'linear-gradient(to right, #C6CCFF, #FFFFFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          당신의 글이 자라는 공간, BetaView
        </h2>

        {/* 카드 컨테이너 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          {/* 카드 1 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: '20px 24px',
              backdropFilter: 'blur(6px)',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
              💡 BetaFocus로 글의 핵심을 파악하세요
            </div>
            <div style={{ fontSize: 14, color: '#BBBBBB' }}>
              AI가 도출한 인사이트로, 글을 빠르게 다듬을 수 있어요.
            </div>
          </div>

          {/* 카드 2 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: '20px 24px',
              backdropFilter: 'blur(6px)',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
              ✍️ 글쓰기 목표를 설정하고 꾸준히 작성해보세요
            </div>
            <div style={{ fontSize: 14, color: '#BBBBBB' }}>
              매주 한 편, 나만의 루틴으로 성장할 수 있어요.
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <button
          onClick={onLogin}
          style={{
            background: 'linear-gradient(to right, #3B4EFF, #7B8CFF)',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 600,
            padding: '12px 28px',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(59, 78, 255, 0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          로그인하고 글쓰기 시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomeBackSection;
