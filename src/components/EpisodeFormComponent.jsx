import { useRouter } from 'next/router';
import { FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import useTabStore from '@/store/useTabStore';
import useEpisodeForm from '@/hooks/useEpisode';

const EpisodeFormComponent = () => {
  const {tabs,selectedTab} = useTabStore();
  const router = useRouter();
  const { userId, manuscriptId, tabId } = router.query; // URL 파라미터에서 값 추출
  const selectedTabFromStore = tabs.find((tab) => tab.id === selectedTab?.id) || null;







  console.log("tabs",tabs);
  console.log("selectedTab",selectedTab);

  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    onSubmit,
    setValue,
  } = useEpisodeForm();


  // 드롭다운 값 변경 핸들러
  const handleDropdownChange = (value) => {
    // handleFormChange('dropdown', value);
    setValue('dropdown', value);
  };


  // 폼 유효성 검사
  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const dropdownValue = watch('dropdown');
  const isFormValid = titleValue && episodeValue && dropdownValue !== '';

  return (
    <div>
      <div
        style={{
          color: 'white',
          fontSize: 36,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '50.4px',
          paddingBottom: '12px',
        }}
      >
        {selectedTabFromStore ? selectedTabFromStore.label : '선택된 탭이 없습니다.'}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <TitleInput control={control} error={errors.title} showLabel={false} />
            <DropdownInput control={control} error={errors.dropdown} onDropdownChange={handleDropdownChange} />
          </div>

          <EpisodeInput control={control} error={errors.episode} />

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
            <SaveEpiBtn disabled={!isFormValid} onClick={handleSubmit(onSubmit)}  />
            <CheckCommentBtn disabled={!isFormValid} onClick={handleSubmit(onSubmit)}  />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EpisodeFormComponent;
