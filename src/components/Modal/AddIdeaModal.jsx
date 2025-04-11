'use client';

import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import KeywordInput from '../FormComponents/KeywordInput';
import useIdea from '@/hooks/useIdea';
import { useRouter } from 'next/router';

const AddIdeaModal = ({ onClose}) => {
    const router = useRouter(); // useRouter 사용
    const { manuscriptId } = router.query; // URL에서 manuscriptId 추출

  const {
    methods,
    control,
    errors,
    handleSubmit,
    handleKeywordChange,
    watch,
    loading,
    getValues,
    fetchIdeas,
    addIdea,
  } = useIdea();

  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const isFormValid = titleValue && episodeValue !== '';


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
            아이디어 추가
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
            <TitleInput control={control} error={errors.title} showLabel={false} title={'아이디어 제목'} />
            <DropdownInput control={control} error={errors.dropdown} type={'아이디어'}/>
            <EpisodeInput control={control} error={errors.episode} title={'상세내용'} />
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
          disabled={!isFormValid} 
          onClick={handleSubmit((formData) => addIdea(formData, manuscriptId))}
          />
      </div>
    </div>
  );
};

export default AddIdeaModal;
