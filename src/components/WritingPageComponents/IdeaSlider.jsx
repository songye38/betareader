import React, { useEffect, useRef, useState } from 'react';
import IdeaItem from './IdeaItem';
import AddIdeaModal from '../Modal/AddIdeaModal';
import { useRouter } from 'next/router';
import useIdea from '@/hooks/useIdea';
import { toast } from 'react-toastify';


const IdeaSlider = ({ isVisible, onClose }) => {
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ⬅️ 추가
  const {ideas,fetchIdeas ,loading,deleteIdea}= useIdea();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isVisible && sliderRef.current && !sliderRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!manuscriptId) return;
    fetchIdeas(manuscriptId); // 내부에서 loading 및 ideas 처리됨
  }, [isVisible]);
  

  return (
    <>
      {/* 아이디어 리스트 슬라이더 */}
      <div
        ref={sliderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: isVisible && !isPopupOpen ? 0 : '-420px',
          height: '100vh',
          width: '400px',
          background: '#1F1F24',
          transition: 'left 0.3s ease-in-out',
          boxShadow: '2px 0 6px rgba(0,0,0,0.4)',
          padding: 20,
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: '1px solid #3A3D46',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
              color: '#FFFFFF',
            }}
          >
            아이디어 모음
          </div>

          <button
            onClick={() => setIsPopupOpen(true)}
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
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3A3B42')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C2D34')}
          >
            아이디어 추가하기
          </button>
        </div>

        {/* 아이디어 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {loading ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>로딩중...</div>
          ) : !ideas || ideas.length === 0 ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>아이디어가 없습니다.</div>
          ) : (
            ideas.map((idea, idx) => <IdeaItem key={idx} idea={idea} onDelete={deleteIdea} />)
          )}
      </div>
      </div>

      {/* 아이디어 추가 슬라이드 */}
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '400px',
            zIndex: 1001,
            transition: 'transform 0.3s ease-in-out',
            backgroundColor: '#2C2D34',
            boxShadow: '2px 0 6px rgba(0,0,0,0.4)',
          }}
        >
          <AddIdeaModal
            onClose={() => setIsPopupOpen(false)}
            // onSubmit={handleAddIdea}
          />
        </div>
      )}
    </>
  );
};

export default IdeaSlider;
