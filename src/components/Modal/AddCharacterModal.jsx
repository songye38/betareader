import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import TitleInput from '../FormComponents/TitleInput';
import EpisodeInput from '../FormComponents/EpisodeInput';
import DropdownInput from '../FormComponents/DropdownInput';
import CheckCommentBtn from '../Buttons/CheckCommentBtn';
import KeywordInput from '../FormComponents/KeywordInput';
import useCharacter from '@/hooks/useCharacter';
import { useRouter } from 'next/router';

const AddCharacterModal = ({ onClose }) => {
    const router = useRouter(); // useRouter 사용
    const { manuscriptId } = router.query; // URL에서 manuscriptId 추출
  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    setValue,
    getValues,
    loading,
    error,
    handleKeywordChange,
    fetchCharacters,
    addCharacter,
  } = useCharacter();

  const titleValue = watch('title');
  const isFormValid = titleValue !== '';

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
            onSubmit={handleSubmit((formData) => addCharacter(formData, manuscriptId))}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <TitleInput control={control} error={errors.title} showLabel={false} title={'캐릭터 이름'} name={"name"} />
            <DropdownInput control={control} error={errors.dropdown} type={'캐릭터'} name={"character_type"} />
            <DropdownInput control={control} error={errors.dropdown} type={'성별'} name={"gender"} />
            <TitleInput control={control} error={errors.title} showLabel={false} title={'나이'}  name={'age'}/>
            <KeywordInput
              control={control}
              error={errors.newKeywords}
              onKeywordChange={handleKeywordChange}
              getValues={getValues}
              loading={loading}
              title={'성격 키워드'}
            />
            <EpisodeInput control={control} error={errors.episode} title={'성장배경'} name={"backstory"} />
            <EpisodeInput control={control} error={errors.episode} title={'외형특징'} name={"appearance"} />
            <EpisodeInput control={control} error={errors.episode} title={'주요목표'} name={"goal"}/>
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
          onClick={handleSubmit((formData) => addCharacter(formData, manuscriptId))}
          />
      </div>
    </div>
  );
};

export default AddCharacterModal;
