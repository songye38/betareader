import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTabStore from '@/store/useTabStore'; // Zustand 사용
import StartSettingBtn from './Buttons/StartSettingBtn';
import Button1 from './Buttons/Button1';
import useManuscriptStore from '@/store/useManuscriptStore';
import UpdateSettingBtn from './Buttons/UpdateSettingBtn';

const StartComponent = ({ isSetup }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { addTab, setSelectedTab, currentManuscriptId, incrementManuscriptId, selectedTab, tabs } = useTabStore();
  const { manuscript } = useManuscriptStore();

  useEffect(() => {
    if (manuscript) {
      setIsLoading(false);
    }
  }, [manuscript]);

  // 설정집 추가
  const handleButtonClick = () => {
    if (tabs.some(tab => tab.id === 'settings')) return;

    const newTab = {
      type: 'setting',
      no: 0,
      id: 'settings',
      label: '설정집',
      EpisodeId: null,
      selected: true,
    };

    addTab(newTab);
    router.push({ pathname: router.pathname, query: { ...router.query, tab: newTab.id } });

    if (selectedTab !== 'settings') {
      setSelectedTab(newTab.id, newTab.no);
    }
  };

  // 원고 추가
  const handleAddTab = () => {
    const newTabId = Date.now();
    const newEpisodeId = currentManuscriptId;

    const newTab = {
      type: 'episode',
      id: newTabId,
      no: newEpisodeId,
      label: `${newEpisodeId}화`,
      EpisodeId: newEpisodeId,
      selected: true,
    };

    addTab(newTab);
    if (newTabId !== selectedTab) {
      setSelectedTab(newTabId, newEpisodeId);
    }

    router.push({ pathname: router.pathname, query: { ...router.query, tab: newTabId } });
    incrementManuscriptId();
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <div style={titleWrapperStyle}>
          <img src="/book_icon.svg" alt="Profile" width={45} height={45} />
          <div style={titleStyle}>{manuscript?.title || "로딩 중..."}</div>
        </div>

        {/* 2x2 레이아웃 적용 */}
        <div style={gridContainerStyle}>
          {/* 설정집 수정 */}
          <div style={cardStyle}>
            <div style={cardContentStyle}>
              <div style={cardTitleStyle}>설정집 수정</div>
            </div>
            <UpdateSettingBtn />
          </div>

          {/* 새 원고 추가 */}
          <div style={cardStyle}>
            <div style={cardContentStyle}>
              <div style={cardTitleStyle}>새 원고 추가</div>
            </div>
            <Button1 onClick={handleAddTab} type={'default'} status={isSetup} />
          </div>

          {/* 최근 작업한 에피소드 보기 */}
          <div style={cardStyle}>
            <div style={cardContentStyle}>
              <div style={cardTitleStyle}>최근 작업한 에피소드</div>
            </div>
            <StartSettingBtn onClick={handleButtonClick} />
          </div>

          {/* 새 원고지 작성 */}
          <div style={{ ...cardStyle, background: isSetup ? '#5E6CFF' : '#2F3138' }}>
            <div style={cardContentStyle}>
              <div style={{ ...cardTitleStyle, color: isSetup ? 'white' : '#737373' }}>
                새 원고지 작성
              </div>
            </div>
            {isSetup ? (
              <Button1 onClick={handleAddTab} type={'default'} status={isSetup} />
            ) : (
              <div style={disabledTextStyle}>기본 설정집을 먼저 작성해주세요</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartComponent;

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // 🔼 위쪽 정렬
    height: '100vh',
    width: '100%',
    paddingTop: '10vh', // 🔼 원하는 만큼 조절 (예: 10vh)
  };

const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '52px',
  justifyContent: 'center',
  alignItems: 'center',
};

const titleWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
  justifyContent: 'center',
  alignItems: 'center',
};

const titleStyle = {
  color: 'white',
  fontSize: 44,
  fontFamily: 'Pretendard',
  fontWeight: '600',
  lineHeight: '61.6px',
  wordWrap: 'break-word',
};

// 2x2 레이아웃 스타일
const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  width: '100%',
};

// 카드 스타일
const cardStyle = {
  flex: 1,
  width: 'auto',
  height: 88,
  paddingLeft: 28,
  paddingRight: 28,
  paddingTop: 24,
  paddingBottom: 24,
  background: '#1E1F24',
  borderRadius: 20,
  overflow: 'hidden',
  border: '1px #4A4E5B solid',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
};

// 카드 내부 컨텐츠 스타일
const cardContentStyle = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: 16,
  display: 'flex',
};

// 카드 제목 스타일
const cardTitleStyle = {
  color: 'white',
  fontSize: 20,
  fontFamily: 'Pretendard',
  fontWeight: '600',
  lineHeight: '28px',
  wordWrap: 'break-word',
};

// 비활성 메시지 스타일
const disabledTextStyle = {
  color: '#737373',
  fontSize: 14,
  fontFamily: 'Pretendard',
  fontWeight: '500',
  lineHeight: '19.6px',
};
