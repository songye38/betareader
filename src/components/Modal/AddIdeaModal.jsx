import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import useManuscriptSetting from '@/hooks/useManuscriptSetting';
import KeywordInput from '../FormComponents/KeywordInput';

const AddIdeaModal = () => {
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
      {/* 상단 영역 (타이틀 + 폼), 스크롤 가능 */}
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

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <TitleInput control={control} error={errors.title} showLabel={false} title={'아이디어 제목'} />
            <DropdownInput control={control} error={errors.dropdown} title={'카테고리'} />
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

      {/* 하단 고정 버튼 */}
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

export default AddIdeaModal;
