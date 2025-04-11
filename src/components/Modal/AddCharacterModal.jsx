import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import useManuscriptSetting from '@/hooks/useManuscriptSetting';
import KeywordInput from '../FormComponents/KeywordInput';
import AgeInput from '../FormComponents/AgeInput';

const AddCharacterModal = ({ onClose }) => {
  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    onSubmit,
    handleKeywordChange,
    loading,
    getValues,
  } = useManuscriptSetting();

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
      {/* 상단: 타이틀 + 닫기 버튼 + 폼 (스크롤 가능) */}
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
            캐릭터 카드 추가
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
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <TitleInput control={control} error={errors.title} showLabel={false} title={'캐릭터 이름'} />
            <DropdownInput control={control} error={errors.dropdown} type={'캐릭터'}  />
            <AgeInput control={control} error={errors.ageCategory} getValues={getValues} loading={loading} />
            <TitleInput control={control} error={errors.title} showLabel={false} title={'나이'} />
            <KeywordInput
              control={control}
              error={errors.newKeywords}
              onKeywordChange={handleKeywordChange}
              getValues={getValues}
              loading={loading}
              title={'성격 키워드'}
            />
            <EpisodeInput control={control} error={errors.episode} title={'외형특징'} />
            <EpisodeInput control={control} error={errors.episode} title={'주요목표'} />
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
        <CheckCommentBtn disabled={!isFormValid} onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};

export default AddCharacterModal;
