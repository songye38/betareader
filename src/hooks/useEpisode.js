import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Slide } from 'react-toastify';
import { saveEpisode } from '@/models/episodeModel'; 
import { useRouter } from 'next/router';

const useEpisodeForm = (selectedTabFromStore) => {

    const router = useRouter();
    const { manuscriptId, tab } = router.query;

    const tabId = tab; // 혹은 바로 tab을 사용해도 됩니다.

    console.log("hook manuscript id",manuscriptId)
    console.log("hook tab id",tabId)

  const [isSaving, setIsSaving] = useState(false); // 자동 저장 여부
  const methods = useForm({
    defaultValues: {
      title: '',
      episode: '',
      dropdown: '', 
    },
    mode: 'onChange',
  });
  
  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  
  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const dropdownValue = watch('dropdown');
  
  const isFormValid = titleValue && episodeValue && dropdownValue !== '';
  
  // 드롭다운 값 변경 핸들러
  const handleDropdownChange = (value) => {
    setValue('dropdown', value);
  };
  
  function getEpisodeType(type) {
    switch (type) {
      case "프롤로그":
        return "PROLOGUE";
      case "에피소드":
        return "EPISODE";
      case "에필로그":
        return "EPILOGUE";
      default:
        return "EPISODE";
    }
  }
  
  // 폼 제출 함수
  const onSubmit = async (data) => {

    if (!manuscriptId || !tabId || !data.title || !data.episode) {
      toast.error("hook 입니다. -------필수 정보가 누락되었습니다. 모든 정보를 확인해주세요.");
      return;
    }

    // 서버에 보낼 데이터
    const requestData = {
      manuscriptId : manuscriptId,
      tabId : tabId,
      title: data.title,
      content: data.episode,
      type: getEpisodeType(data.dropdown),
    };

    console.log("hook",requestData)

    try {
      const response = await saveEpisode(requestData);
      if (!response || response.error) {
        toast.error("에피소드 저장에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      toast.success("에피소드가 성공적으로 저장되었습니다!");

    } catch (error) {
      console.error("❌ 요청 중 에러 발생:", error);
      toast.error("에피소드 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 자동 저장을 위한 debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isFormValid && !isSaving) {
        setIsSaving(true);
        
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
    }, 2000);

    return () => clearTimeout(timeout); 
  }, [titleValue, episodeValue,dropdownValue ]);

  return {
    methods,
    control,
    handleSubmit,
    errors,
    watch,
    isFormValid,
    handleDropdownChange,
    onSubmit,
    setValue,
  };
};

export default useEpisodeForm;

