import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import useStore from '@/store/useStore';
import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import { toast, Slide } from 'react-toastify';

const EpisodeFormComponent = () => {
  const selectedTabFromStore = useStore.getState().tabs.find(tab => tab.selected);
  const router = useRouter();
  const { userId, manuscriptId } = router.query; // URL 파라미터에서 값 추출
  const [isSaving, setIsSaving] = useState(false); //자동저장을 위한 기능
  
  // 폼 관련 코드
  const methods = useForm({
    defaultValues: {
      title: '',
      episode: '',
      dropdown: '', 
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;

  // 드롭다운 값 변경 핸들러
  const handleDropdownChange = (value) => {
    setValue('dropdown', value);
  };

  const onSubmit = (data) => {
    const episodeId = selectedTabFromStore ? selectedTabFromStore.id : null;
    const epiNo = selectedTabFromStore ? selectedTabFromStore.EpisodeId : null;

    const combinedData = {
      ...data,
      manuscriptId,
      epiNo
    };

    console.log("최종 들어오는 데이터는? ", combinedData);
    
    const epiId = episodeId;

    // 라우팅 경로 수정
    if (userId && episodeId && manuscriptId && epiId) {
      router.push(`/${userId}/${manuscriptId}/${epiId}/comment`);
    } else {
      toast.error("필수 정보가 누락되었습니다. 모든 정보를 확인해주세요.");
    }
  };

  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const dropdownValue = watch('dropdown');

  const isFormValid = titleValue && episodeValue && dropdownValue !== '';

  const handleButtonClick = () => {
    if (isFormValid) {
      toast.success("폼이 성공적으로 제출되었습니다!", {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: "dark",
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
      // 폼 제출 실행
      handleSubmit(onSubmit)();
    } else {
      toast.error("폼을 모두 작성해주세요!", {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: "dark",
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
    }
  };

    // 자동 저장을 위한 debounce
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (isFormValid && !isSaving) {
          setIsSaving(true);
          //TODO 자동저장 서버에 저장


          localStorage.setItem('episodeForm', JSON.stringify({
            title: titleValue,
            episode: episodeValue,
            dropdown: dropdownValue,
          }));
          toast.info("자동 저장되었습니다.", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeButton: true,
            theme: "dark",
            draggable: false,
            pauseOnHover: true,
            transition: Slide,
          });
          setIsSaving(false);
        }
      }, 2000); // NOTE 2초마다 자동 저장
  
      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 클리어
    }, [titleValue, episodeValue, isSaving, isFormValid]);

  return (
    <div>
      <div
        style={{
          color: 'white',
          fontSize: 36,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '50.4px',
          paddingBottom:'12px',
        }}
      >
        {selectedTabFromStore ? selectedTabFromStore.label : '선택된 탭이 없습니다.'} {/* selectedTab이 없으면 대체 텍스트 표시 */}
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
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: 888,
              paddingRight: 24,
              borderTop: '1px #3A3D46 solid',
              justifyContent: 'flex-end',
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <CheckCommentBtn disabled={!isFormValid} onClick={handleButtonClick} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EpisodeFormComponent;
