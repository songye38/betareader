import React, { useEffect } from 'react';
import AllEpiItem from './AllEpiItem';

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

const AllEpiSlider = ({ isVisible }) => {
  // 외부 클릭 시 슬라이더 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && !e.target.closest('#all-epi-slider')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  return (
    <div
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
      id="all-epi-slider"
    >
      {/* 헤더 */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid #3A3D46',
          color: 'white',
          fontSize: '20px',
          fontWeight: 600,
          fontFamily: 'Pretendard',
        }}
      >
        전체 원고 목록
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
        {dummyEpisodes.map((ep, idx) => (
          <AllEpiItem key={idx} episode={ep} />
        ))}
      </div>
    </div>
  );
};

export default AllEpiSlider;
