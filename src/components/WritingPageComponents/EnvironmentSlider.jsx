import React, { useEffect, useRef, useState } from 'react';
import EnvironmentItem from './EnvironmentItem';
import AddEnvironmentModal from '../Modal/AddEnvironmentModal';
import useEnvironment from '@/hooks/useEnvironment';
import { useRouter } from 'next/router';

const EnvironmentSlider = ({ isVisible, onClose }) => {
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {environments,fetchEnvironments ,loading,deleteEnvironment}= useEnvironment();

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
    }, [isVisible]);

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
            onClick={() => setIsPopupOpen(true)}
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
            environments.map((env, idx) => <EnvironmentItem key={idx} environment={env} onDelete={deleteEnvironment} />)
          )}
      </div>


      </div>

      {/* AddEnvironmentModal */}
      {isPopupOpen && (
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
            onClose={() => {
              setIsPopupOpen(false);
              onClose?.(); // 슬라이더도 함께 닫히게!
            }}
          />
        </div>
      )}
    </>
  );
};

export default EnvironmentSlider;
