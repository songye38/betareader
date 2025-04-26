import React, { useEffect, useRef, useState } from 'react';
import CharacterItem from './CharacterItem';
import AddCharacterModal from '../Modal/AddCharacterModal';
import { useRouter } from 'next/router';
import useCharacter from '@/hooks/useCharacter';


const CharacterSlider = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingIdeaId, setEditingIdeaId] = useState(null); 
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const sliderRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { fetchCharacters, characters, loading, deleteCharacter } = useCharacter();

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
    fetchCharacters(manuscriptId); // 내부에서 loading 및 ideas 처리됨
  }, [isVisible, manuscriptId]);

  const handleEdit = (ideaId) => {
    console.log("버튼이 눌리고 값이 들어오나?", ideaId);
    setEditingIdeaId(ideaId); // 수정할 아이디 설정
    setIsModalOpen(true);     // 모달 열기
  };

  return (
    <>
      {/* 캐릭터 슬라이더: 팝업 안 열렸을 때만 보이게 */}
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
        {/* 헤더 + 추가 버튼 */}
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
          <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Pretendard' }}>캐릭터 카드</div>

          <button
            onClick={() => setIsModalOpen(true)}
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
            캐릭터 카드 추가하기
          </button>
        </div>

        {/* 캐릭터 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>로딩중...</div>
          ) : !characters || characters.length === 0 ? (
            <div style={{ color: '#aaa', textAlign: 'center' }}>캐릭터가 없습니다.</div>
          ) : (
            characters.map((char, idx) => <CharacterItem key={idx} character={char} onDelete={deleteCharacter} onEdit={() => handleEdit(char.id)} />)
          )}
        </div>
      </div>

      {/* 캐릭터 모달: 오버레이 */}
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
          <AddCharacterModal
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


export default CharacterSlider;
