import React, { useState } from 'react';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import FeedbackSettingModal from './FeedbackComponents/FeedbackSettingModal';
import { useFeedback } from '@/hooks/useFeedback';
import useWritingTab from '@/hooks/useWritingTab';
import useEpisodeForm from '@/hooks/useEpisode';

const NavMainSection = ({ onSave,episodeId,userId,tabId }) => {
  const {handleUpdateFeedbackMode} = useEpisodeForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(5); // ✅ 기본값 5개로 초기화
  const { addCommentLink } = useFeedback(); // 피드백 훅 사용
  const { handleUpdateTab } = useWritingTab(); // ✅ 훅 호출해서 함수 가져오기

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelect = (option) => {
    setSelected(option); // ✅ 선택한 개수 상태 업데이트
  };


  const handleShare = async () => {
    console.log(`📤 피드백 요청: 최소 ${selected}개`);
    console.log("episodeId",episodeId);
    try {
      const result = await addCommentLink(episodeId, selected,userId);
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

      }
      handleCloseModal(); // ✅ 성공했을 때만 닫기
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
