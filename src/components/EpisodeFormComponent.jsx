import { FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
// import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import useTabStore from '@/store/useTabStore';
import useEpisodeForm from '@/hooks/useEpisode';
import { useEffect, useState,useRef } from 'react';

const EpisodeFormComponent = () => {
  const { tabs, selectedTab } = useTabStore();
  const selectedTabFromStore = tabs.find((tab) => tab.id === selectedTab?.id) || null;
  const prevTabRef = useRef(null); // 이전 탭을 저장하는 useRef 추가
  
  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    onSubmit,
    setValue,
  } = useEpisodeForm();

  // 로컬 상태를 생성하여 각 탭별로 데이터를 개별 관리
  const [episodeState, setEpisodeState] = useState({ title: '', episode: '' });

    // 폼 유효성 검사
    const titleValue = watch('title');
    const episodeValue = watch('episode');
    const isFormValid = titleValue && episodeValue  !== '';

  // 탭이 변경될 때 개별 상태를 불러오기
  // useEffect(() => {
  
  //   if (prevTabRef.current && isFormValid) {
  //     console.log(`탭이 ${prevTabRef.current.label} → ${selectedTabFromStore.label}로 전환됨, 이전 탭을 저장합니다.`);
      
  //     // ✅ 이전 탭의 ID를 명확하게 저장
  //     const previousTabId = prevTabRef.current.id;
  //     const previousTabNo = prevTabRef.current.no;

  //     console.log("previousTabId이 값은 뭐지?",previousTabId);
  //     console.log("previousTabNo이 값은 뭐지?",previousTabNo);
      
  //     handleSubmit((data) => onSubmit({ ...data, tabNo: previousTabNo }))(); 
  //   }
  
  //   if (selectedTabFromStore) {
  //     setEpisodeState({
  //       title: selectedTabFromStore?.data?.title || '',
  //       episode: selectedTabFromStore?.data?.episode || '',
  //     });
  
  //     // react-hook-form 필드 값 업데이트
  //     setValue('title', selectedTabFromStore?.data?.title || '');
  //     setValue('episode', selectedTabFromStore?.data?.episode || '');
  
  //     // ✅ 현재 탭을 이전 탭으로 저장
  //     prevTabRef.current = selectedTabFromStore;
  //   }
  // }, [selectedTabFromStore, setValue]);



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
            {/* <DropdownInput control={control} error={errors.dropdown} onDropdownChange={handleDropdownChange} /> */}
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
            <CheckCommentBtn disabled={!isFormValid} onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EpisodeFormComponent;
