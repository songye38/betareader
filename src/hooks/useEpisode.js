import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Slide } from 'react-toastify';
import { saveEpisode } from '@/models/episodeModel'; 
import { useRouter } from 'next/router';
import useTabStore from '@/store/useTabStore';

const useEpisodeForm = () => {

    const router = useRouter();
    const { manuscriptId, tab } = router.query;
    const { selectedTab } = useTabStore();

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
      tabNo : selectedTab.no,
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
          console.error("❌ API 실패 상세 정보:", response);
          toast.error("에피소드 저장에 실패했습니다. 다시 시도해주세요.");
          return;
        }
      
        toast.success("에피소드가 성공적으로 저장되었습니다!");
      
      } catch (error) {
        console.error("❌ 요청 중 에러 발생:", error);
      
        // Axios 의 경우 error.response 도 체크
        if (error.response) {
          console.error("🔍 서버 응답 error.response:", error.response);
          console.error("🔍 서버 응답 데이터 error.response.data:", error.response.data);
          console.error("🔍 서버 응답 상태코드 error.response.status:", error.response.status);
        } else if (error.request) {
          console.error("🔍 요청은 갔지만 응답 없음 error.request:", error.request);
        } else {
          console.error("🔍 기타 에러 메시지:", error.message);
        }
      
        toast.error("에피소드 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }      

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

