import React, { useEffect, useRef } from 'react';
import AllEpiItem from './AllEpiItem';
import useWritingTab from '../../hooks/useWritingTab';
import useTabStore from '@/store/useTabStore';

const dummyEpisodes = [
  {
    title: '프롤로그: 각성',
    content: '주인공은 의식을 잃고 병원에서 깨어난다. 그 순간부터 그는 사람들의 생각을 읽을 수 있게 된다...',
    lastUpdated: '2025.04.01',
    status: '작성중',
  },
  {
    title: '1화: 도시의 어둠',
    content: '대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 ',
    lastUpdated: '2025.03.30',
    status: '피드백 받는중',
  },
  {
    title: '2화: AI의 속삭임',
    content: '인공지능이 사람을 속이고 조종하는 방법은? 이소연은 의심을 품기 시작한다.',
    lastUpdated: '2025.03.28',
    status: '작성중',
  },
];

const AllEpiSlider = ({ isVisible, onClose, activeTitle }) => {
  const { handleAddTab,handleTabChange } = useWritingTab(); // ✅ 훅 호출해서 함수 가져오기
  const sliderRef = useRef(null);
  const {tabs,currentManuscriptId,selectedTab} = useTabStore(); // Zustand 사용

  console.log("tabs",tabs);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && sliderRef.current && !sliderRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  return (
    <div
      ref={sliderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: isVisible ? 0 : '-420px',
        width: '400px',
        height: '100vh',
        backgroundColor: '#1E1F24',
        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 0px 12px',
        transition: 'left 0.3s ease-in-out',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 + 버튼 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 20px 16px 20px',
          borderBottom: '1px solid #3A3D46',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            fontFamily: 'Pretendard',
            color: 'white',
          }}
        >
          전체 원고 목록
        </div>

        <button
          style={{
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#2C2D34',
            border: '1px solid #3A3D46',
            borderRadius: 6,
            fontFamily: 'Pretendard',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={handleAddTab} // ✅ 여기 연결!
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3A3B42'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2C2D34'}
        >
          원고 추가하기
        </button>
      </div>

      {/* 콘텐츠 리스트 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {tabs.map((tab) => (
          <AllEpiItem
            key={tab.id}
            episode={tab}
            active={tab.selected} // ✅ selected가 true면 active 처리
            onClick={() => handleTabChange(tab.id)} // ✅ 클릭 시 탭 전환
          />
        ))}
      </div>
    </div>
  );
};

export default AllEpiSlider;
