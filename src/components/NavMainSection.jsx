import React, { useState } from 'react';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import FeedbackSettingModal from './FeedbackComponents/FeedbackSettingModal';
import { useFeedback } from '@/hooks/useFeedback';
import useWritingTab from '@/hooks/useWritingTab';
import useEpisodeForm from '@/hooks/useEpisode';
import CopyFeedbackLink from './Popups/CopyFeedbackLink';
import { toast } from 'react-toastify';

const NavMainSection = ({ onSave, episodeId, userId, tabId, is_feedback_mode,isTitleChanged,setIsTitleChanged,isContentChanged,setIsContentChanged }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const { handleUpdateFeedbackMode } = useEpisodeForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(5); // ✅ 기본값 5개로 초기화
  const { addCommentLink } = useFeedback(); 
  const { handleUpdateTab } = useWritingTab(); 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // const handleSelect = (option) => {
  //   setSelected(option); 
  // };

  const handleSave = async () => {
    await onSave(); // 원래 넘어온 저장 함수 호출
    setIsTitleChanged(false); // ✅ 저장 완료 후 isTitleChanged 초기화
    setIsContentChanged(false);
  };



  const handleShare = async () => {
    console.log(`📤 피드백 요청: 최소 ${selected}개`);
    console.log("episodeId", episodeId);
    try {
      const result = await addCommentLink(episodeId, selected, userId);
      if (result) {
        console.log("✅ 생성된 링크:", `${window.location.origin}/feedback/${result.id}`);

        // 상태 업데이트는 여기! 서버에 아직 저장은 안함 
        handleUpdateTab(tabId, {
          is_feedback_mode: true,
        });

        // 서버에 `is_feedback_mode` 업데이트 요청
        const updatedEpisode = await handleUpdateFeedbackMode(episodeId, true);

        if (updatedEpisode) {
          console.log("✅ 서버에서 피드백 모드 업데이트 완료:", updatedEpisode);
        }

        setLinkUrl(`${window.location.origin}/feedback/${result.id}`); // ✅ 링크 URL 설정

      }
      handleCloseModal(); // ✅ 성공했을 때만 닫기
      setShowEditPopup(true)
    } catch (e) {
      console.error("링크 생성 실패:", e);
    }
  };

  return (
    <div style={{
      width: 'auto',
      padding: '12px 12px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    }}>
      {is_feedback_mode ? (
        // 피드백 모드일 때만 보이는 버튼
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
          }}>
            <p>🚫피드백을 받을때는 텍스트를 수정할 수 없습니다.</p> 
          </div>
          <button
            onClick={async () => {
              //TODO [SCRUM-13] 복사되는 링크 새롭게 가져와야 함
              try {
                await navigator.clipboard.writeText(linkUrl);
                toast.success("링크가 복사되었습니다!"); 
              } catch (err) {
                toast.error("링크 복사에 실패했습니다.");
              }
            }}
            style={{
              padding: '8px 14px',
              background: '#A78EF7',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              fontFamily: 'Pretendard',
              fontWeight: 600,
              lineHeight: '20px',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 6px rgba(167, 142, 247, 0.3)',
              transform: 'translateY(0)',
            }}
          >
            피드백 링크 복사하기
          </button>
        </div>
      ) : (
        <>
          {/* 피드백 모드가 아니면 보이는 버튼들 */}
          <SaveEpiBtn onClick={handleSave} />
          <CheckCommentBtn 
            title="피드백 받기" 
            onClick={handleOpenModal} 
            disabled={episodeId === "" || isTitleChanged || isContentChanged} 
          />
        </>
      )}
      {isModalOpen && (
        <FeedbackSettingModal
          selected={selected}
          onSelect={setSelected}
          onShare={handleShare}
          onClose={handleCloseModal}
        />
      )}
      {showEditPopup && (
        <CopyFeedbackLink
          onClose={() => setShowEditPopup(false)}
          linkUrl={linkUrl}
        />
      )}
    </div>
  );
};

export default NavMainSection;
