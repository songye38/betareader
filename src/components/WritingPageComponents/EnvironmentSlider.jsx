import React, { useEffect, useRef, useState } from 'react';
import EnvironmentItem from './EnvironmentItem';
import AddEnvironmentModal from '../Modal/AddEnvironmentModal';
import useEnvironment from '@/hooks/useEnvironment';
import { useRouter } from 'next/router';

const EnvironmentSlider = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //💥💥💥💥💥💥추가됨
  const [editingIdeaId, setEditingIdeaId] = useState(null); //💥💥💥💥💥💥추가됨
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { environments, fetchEnvironments, loading, deleteEnvironment } = useEnvironment();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && !isPopupOpen && sliderRef.current && !sliderRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose, isPopupOpen]);

  useEffect(() => {
    if (!manuscriptId) return;
    fetchEnvironments(manuscriptId); // 내부에서 loading 및 ideas 처리됨
  }, [isVisible, manuscriptId]);

  //💥💥💥💥💥💥추가됨
  const handleEdit = (ideaId) => {
    console.log("버튼이 눌리고 값이 들어오나?", ideaId);
    setEditingIdeaId(ideaId); // 수정할 아이디 설정
    setIsModalOpen(true);     // 모달 열기
  };


  return (
    <>
      <div
        ref={sliderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: isVisible && !isPopupOpen ? 0 : -420,
          width: 400,
          height: '100vh',
          backgroundColor: '#1F1F23',
          color: 'white',
          padding: 20,
          overflowY: 'auto',
          boxShadow: '4px 0px 10px rgba(0,0,0,0.2)',
          borderRight: '1px solid #3A3D46',
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
            paddingBottom: 16,
            marginBottom: 20,
            borderBottom: '1px solid #3A3D46',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
            }}
          >
            세계관 노트
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
            onClick={() => setIsModalOpen(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
          >
            세계관 노트 추가하기
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>로딩중...</div>
          ) : !environments || environments.length === 0 ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>아이디어가 없습니다.</div>
          ) : (
            environments.map((env, idx) => <EnvironmentItem key={idx} environment={env} onDelete={deleteEnvironment} onEdit={() => handleEdit(env.id)} />)
          )}
        </div>


      </div>

      {/* AddEnvironmentModal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1001,
            backgroundColor: '#2C2D34',
            width: 400,
            height: '100vh',
          }}
        >
          <AddEnvironmentModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingIdeaId(null); // 닫을 때 초기화
            }}
            ideaId={editingIdeaId} // 수정할 아이디어 id 전달
            manuscriptId={manuscriptId}
          />
        </div>
      )}
    </>
  );
};

export default EnvironmentSlider;
