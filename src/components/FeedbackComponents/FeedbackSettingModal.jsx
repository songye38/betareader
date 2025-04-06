import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['800'], 
  subsets: ['latin'],
  display: 'swap'
});

const feedbackOptions = [5, 10, 15, 20];

const feedbackMessages = {
  5: {
    title: '가볍게 실전 경험해보기',
    description: '부담 없이 피드백을 받아보고, 독자의 반응을 빠르게 확인해보세요.',
  },
  10: {
    title: '균형 잡힌 의견 수집',
    description: '다양한 시각에서 글을 점검하고, 균형 잡힌 피드백을 받아보세요.',
  },
  15: {
    title: '깊이 있는 분석과 조언',
    description: '보다 깊이 있는 의견을 통해, 글의 숨은 문제를 발견할 수 있어요.',
  },
  20: {
    title: '완벽을 위한 철저한 검토',
    description: '다양한 관점에서 꼼꼼하게 검토받고, 완성도를 한층 끌어올려보세요.',
  },
};

const FeedbackSettingModal = ({ selected = 5, onSelect, onShare, onClose }) => {
  const message = feedbackMessages[selected] || feedbackMessages[5];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        padding: 24,
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        fontFamily: 'Pretendard',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* 상단 헤더 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 600 }}>피드백 설정</div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: 20,
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; }}
          aria-label="모달 닫기"
        >
          ✕
        </button>
      </div>

      {/* 설명 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            backgroundColor: '#3A3A40',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.5,
          }}
        >
          <div 
            className={poppins.className} 
            style={{
              cursor: 'pointer',
              color: '#C6CCFF',
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: '30.8px',
              wordWrap: 'break-word',
            }}
          >
            💥 BetaView
          </div>
          <div>
            BetaView는 당신의 글을 바라보는 24시간의 시선입니다.<br />
            링크를 통해 피드백을 받고, 부족한 반응은 AI가 채워드려요.
          </div>
        </div>
      </div>

      {/* 피드백 선택 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>
          받고 싶은 최소 피드백 개수를 선택하세요.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {feedbackOptions.map((option) => {
            const isSelected = selected === option;
            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  backgroundColor: '#2C2C2E',
                  color: '#FFF',
                  fontWeight: 500,
                  fontSize: 14,
                  border: isSelected ? '1px solid white' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#3A3A3C';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#2C2C2E';
                }}
              >
                {option}개
              </button>
            );
          })}
        </div>

        {/* 동적 설명 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{message.title}</div>
          <div style={{ fontSize: 14, fontWeight: 400, color: '#A1A1A1' }}>
            {message.description}
          </div>
        </div>
      </div>

      {/* 공유 버튼 */}
      <button
        onClick={onShare}
        style={{
          marginTop: 8,
          alignSelf: 'flex-end',
          padding: '10px 16px',
          backgroundColor: '#3A3A3C',
          color: '#FFF',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4A4A4C';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3A3A3C';
        }}
      >
        피드백 요청 링크 만들기
      </button>
    </div>
  );
};

export default FeedbackSettingModal;
