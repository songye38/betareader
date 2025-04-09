'use client';
import Navbar from '@/components/NavBar';
import NavMainSection from '@/components/NavMainSection';
import useWritingTab from '@/hooks/useWritingTab';

import React from 'react';

const StartPage = () => {
    const { handleAddTab } = useWritingTab(); // ✅ 훅 호출해서 함수 가져오기

  const handleAddManuscript = () => {
    alert('원고지를 추가하는 기능은 아직 연결되지 않았어요.');
  };

  const cardStyle = {
    backgroundColor: '#1C1C1E',
    border: '1px solid #2A2A2C',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: '240px',
  };

  return (
    <div>
        <Navbar customNavComponent={<NavMainSection />} />
        <div
        style={{
            marginTop:'120px',
            maxWidth: '960px',
            margin: '0 auto',
            padding: '48px 24px',
            fontFamily: 'Pretendard',
            color: '#F5F5F7',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
        }}
        >
        {/* 인삿말 및 버튼 */}
        <div
            style={{
            backgroundColor: '#1C1C1E',
            padding: '32px',
            borderRadius: '16px',
            border: '1px solid #2A2A2C',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            textAlign: 'center',
            }}
        >
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
            ✍️ 원고집을 시작해볼까요?
            </h2>
            <p style={{ fontSize: '15px', color: '#D4D4D8', marginBottom: '20px' }}>
            이 공간에서 나만의 이야기를 자유롭게 펼쳐보세요.
            </p>
            <button
            onClick={handleAddTab}
            style={{
                padding: '12px 24px',
                fontSize: '14px',
                backgroundColor: '#A78BFA',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 500,
            }}
            >
            + 원고지 추가하기
            </button>
        </div>

        {/* BETA 시스템 설명 */}
        <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
            🧪 BetaReader만의 쓰기 시스템
            </h3>
            <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                flexWrap: 'wrap',
            }}
            >
            <div style={cardStyle}>
                <span style={{ fontSize: '24px' }}>👁️</span>
                <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    BetaView
                </h4>
                <p style={{ fontSize: '14px', color: '#D4D4D8' }}>
                    글의 구조를 시각적으로 확인할 수 있는 미리보기 기능이에요. 섹션별 길이, 흐름을 파악해보세요.
                </p>
                </div>
            </div>

            <div style={cardStyle}>
                <span style={{ fontSize: '24px' }}>🎯</span>
                <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                    BetaFocus
                </h4>
                <p style={{ fontSize: '14px', color: '#D4D4D8' }}>
                    쓰기에 집중할 수 있도록 산만한 요소를 없애주는 모드입니다. 오직 텍스트에만 몰입하세요.
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* 원고집 기능 소개 */}
        <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
            📚 이 원고집에서 할 수 있는 일들
            </h3>
            <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                flexWrap: 'wrap',
            }}
            >
            <div style={cardStyle}>
                <span style={{ fontSize: '24px' }}>💡</span>
                <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    아이디어 추가
                </h4>
                <p style={{ fontSize: '14px', color: '#D4D4D8' }}>
                    떠오른 생각들을 자유롭게 메모해보세요. 장면, 문장, 주제 등 어떤 아이디어든 좋습니다.
                </p>
                </div>
            </div>

            <div style={cardStyle}>
                <span style={{ fontSize: '24px' }}>🌍</span>
                <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    세계관 노트
                </h4>
                <p style={{ fontSize: '14px', color: '#D4D4D8' }}>
                    배경, 설정, 규칙 등 세계의 구조를 정리할 수 있어요. 작품의 일관성을 높일 수 있어요.
                </p>
                </div>
            </div>

            <div style={cardStyle}>
                <span style={{ fontSize: '24px' }}>🧑‍🎨</span>
                <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
                    캐릭터 카드
                </h4>
                <p style={{ fontSize: '14px', color: '#D4D4D8' }}>
                    등장인물의 성격, 외모, 말투, 관계를 정리할 수 있는 카드예요. 캐릭터 설정을 놓치지 마세요.
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default StartPage;
