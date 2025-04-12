import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import KeywordInput from '../FormComponents/KeywordInput';
import useEnvironment from '@/hooks/useEnvironment';
import { useRouter } from 'next/router';

const AddEnvironmentModal = ({ onClose }) => {
  const router = useRouter(); // useRouter 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출

  const {
    methods,
    control,
    errors,
    handleSubmit,
    handleKeywordChange,
    watch,
    setValue,
    getValues,
    error,
    ideas,
    loading,
    fetchEnvironments,
    addEnvironment,
  } = useEnvironment();

  const [episodeState, setEpisodeState] = useState({ title: '', episode: '' });

  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const isFormValid = titleValue && episodeValue !== '';

  return (
    <div
      style={{
        width: '400px',
        height: '100vh',
        background: '#2C2D34',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* 상단: 타이틀 + 닫기 버튼 + 폼 */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'Pretendard',
            }}
          >
            세계관 노트 추가
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
            onSubmit={handleSubmit((formData) => addEnvironment(formData, manuscriptId))}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <TitleInput control={control} error={errors.title} showLabel={false} title={'세계관 제목'}  name={"title"}/>
            <DropdownInput control={control} error={errors.dropdown} type={'세계관'} name={"dropdown"}/>
            <EpisodeInput control={control} error={errors.description} title={'상세설명'} name={"description"} />
            <KeywordInput
              control={control}
              error={errors.newKeywords}
              onKeywordChange={handleKeywordChange}
              getValues={getValues}
              loading={loading}
              title={'참고자료 링크'}
            />
            <EpisodeInput control={control} error={errors.note} title={'비고'} name={"note"} />
          </form>
        </FormProvider>
      </div>

      {/* 하단: 고정 버튼 */}
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
          onClick={handleSubmit((formData) => addEnvironment(formData, manuscriptId))}
          />
      </div>
    </div>
  );
};

export default AddEnvironmentModal;
