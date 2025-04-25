import React, { useEffect, useRef } from 'react';
import AllEpiItem from './AllEpiItem';
import useWritingTab from '../../hooks/useWritingTab';
import useTabStore from '@/store/useTabStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import useEpisodeForm from '@/hooks/useEpisode';

const AllEpiSlider = ({ isVisible, onClose, activeTitle }) => {
  const { handleAddTab, handleTabChange } = useWritingTab(); // ✅ 훅 호출해서 함수 가져오기
  const sliderRef = useRef(null);
  const { tabs } = useTabStore(); // Zustand 사용
  const { manuscript } = useManuscriptStore();
  const { handleDeleteEpisode } = useEpisodeForm();

  console.log("tabs에는 어떤 정보가 들어있나?", tabs);
  // 서버에서 가져와서 tabs에 가져온다면 is_feedback_mode 항목이 있고 여기에 피드백 받는중인건지 표시됨


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
          onClick={() => handleAddTab(manuscript.id)}
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
            key={tab.tab_id}
            episode={tab}
            active={tab.selected} // ✅ selected가 true면 active 처리
            onClick={() => handleTabChange(tab.tab_id)} // ✅ 클릭 시 탭 전환
            onDelete={() => handleDeleteEpisode(manuscript.id, tab.id)}

          />
        ))}
      </div>
    </div>
  );
};

export default AllEpiSlider;
