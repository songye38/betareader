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

  const [episodeState, setEpisodeState] = useState({ title: '', episode: '' });

  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const isFormValid = titleValue && episodeValue !== '';

  return (
    <div
      style={{
        width: '400px',
        height: 'auto',
        padding: 20,
        background: '#2C2D34',
        borderRadius: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        display: 'inline-flex',
        overflow: 'hidden',
      }}
    >
        <div>
            아이디어 추가
        </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%',display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TitleInput control={control} error={errors.title} showLabel={false}  title={"아이디어 제목"}/>
            <DropdownInput control={control} error={errors.dropdown} title={"카테고리"} />
            <EpisodeInput control={control} error={errors.episode} title={"상세내용"}/>
            <KeywordInput 
                control={control} 
                error={errors.newKeywords} 
                onKeywordChange={handleKeywordChange} 
                getValues={getValues} // getValues 전달
                loading = {loading}
                title = {"태그 (최대3개)"}
          />
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 24,
              paddingBottom: 24,
              paddingRight: 24,
              borderTop: '1px #3A3D46 solid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <CheckCommentBtn disabled={!isFormValid} onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddIdeaModal;
