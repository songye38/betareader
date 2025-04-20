import React, { useState } from 'react';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import FeedbackSettingModal from './FeedbackComponents/FeedbackSettingModal';
import { useFeedback } from '@/hooks/useFeedback';
// const addCommentLink = async (episodeId, minRequiredComments) => {

const NavMainSection = ({ onSave,episodeId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(5); // ✅ 기본값 5개로 초기화
  const { addCommentLink } = useFeedback(); // 피드백 훅 사용

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelect = (option) => {
    setSelected(option); // ✅ 선택한 개수 상태 업데이트
  };

  const handleShare = async () => {
    console.log(`📤 피드백 요청: 최소 ${selected}개`);
    try {
      const result = await addCommentLink(episodeId, selected);
      if (result) {
        console.log("✅ 생성된 링크:", `${window.location.origin}/feedback/${result.id}`);
      }
      handleCloseModal(); // ✅ 성공했을 때만 닫기
    } catch (e) {
      console.error("링크 생성 실패:", e);
      // 여기에 오류 알림도 넣을 수 있어 (예: toast.error)
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
      <SaveEpiBtn onClick={onSave} />
      <CheckCommentBtn title="피드백 받기" onClick={handleOpenModal} />

      {isModalOpen && (
        <FeedbackSettingModal
          selected={selected}
          onSelect={handleSelect}
          onShare={handleShare}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default NavMainSection;
