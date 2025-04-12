'use client';

import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import KeywordInput from '../FormComponents/KeywordInput';
import useIdea from '@/hooks/useIdea';
import { useEffect } from 'react';

const AddIdeaModal = ({ onClose, ideaId, manuscriptId, isOpen }) => {
  const {
    editIdea,
    methods,
    control,
    errors,
    handleSubmit,
    handleKeywordChange,
    watch,
    loading,
    getValues,
    fetchIdeas,
    idea,
    setValue,
    addIdea,
    fetchIdea
  } = useIdea();

  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const isFormValid = titleValue && episodeValue !== '';

  useEffect(() => {
    if (ideaId && manuscriptId && isOpen) {
      fetchIdea(ideaId, manuscriptId);
    }
  }, [ideaId, manuscriptId, isOpen]);

  // ✨ 수정 모드면서 로딩 중이면 "로딩 중..."만 보여주기
  if (ideaId && loading) {
    return (
      <div
        style={{
          width: '400px',
          height: '100vh',
          background: '#2C2D34',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: 18,
        }}
      >
        로딩 중...
      </div>
    );
  }

  return (
    <div
      style={{
        width: '400px',
        height: '100vh',
        background: '#2C2D34',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* 상단 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* 타이틀 + 닫기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
            }}
          >
            아이디어 {ideaId ? '수정' : '추가'}
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: 20,
              cursor: 'pointer',
              padding: 4,
            }}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((formData) => addIdea(formData, manuscriptId))}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <TitleInput control={control} error={errors.title} showLabel={false} title={'아이디어 제목'} name={"title"} />
            <DropdownInput control={control} error={errors.dropdown} type={'아이디어'} name={"dropdown"} />
            <EpisodeInput control={control} error={errors.episode} title={'상세내용'} name={"episode"} />
            <KeywordInput
              control={control}
              error={errors.newKeywords}
              onKeywordChange={handleKeywordChange}
              getValues={getValues}
              loading={loading}
              title={'태그 (최대3개)'}
            />
          </form>
        </FormProvider>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          borderTop: '1px #3A3D46 solid',
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckCommentBtn
          title={ideaId ? '아이디어 수정' : '아이디어 저장'}
          disabled={!isFormValid}
          onClick={handleSubmit((formData) => {
            if (ideaId) {
              editIdea(formData, ideaId, manuscriptId); // 수정
            } else {
              addIdea(formData, manuscriptId); // 새로 추가
            }
          })}
        />
      </div>
    </div>
  );
};

export default AddIdeaModal;
