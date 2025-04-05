import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Slide } from 'react-toastify';
import { saveEpisode } from '@/models/episodeModel'; 
import { getRecentEpisodes,getEpisodesByManuId } from '@/models/episodeModel';
import useAuthStore from '@/store/useAuthStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import useTabStore from '@/store/useTabStore';

const useEpisodeForm = () => {

    const [recentEpisodes, setRecentEpisodes] = useState([]);  // 최근 에피소드 상태
    const [allEpisodes, setAllEpisodes] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // 자동 저장 여부
    const {manuscript} = useManuscriptStore();
    const {tabs} = useTabStore();

    useEffect(() => {
        if (manuscript) {
          //fetchEpisodesByManuId();
        }
        if (tabs) {
            //fetchRecentEpisodes();
          }
      }, [manuscript, tabs]);
    
    const methods = useForm({
        defaultValues: {
        title: '',
        episode: '',
        },
        mode: 'onChange',
    });
  
  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  
  const titleValue = watch('title');
  const episodeValue = watch('episode');
  
  const isFormValid = titleValue && episodeValue !== '';

  // 폼 제출 함수
  const onSubmit = async (data) => {

    if (!manuscript.id || !tabs.id || !data.title || !data.episode) {
      toast.error("hook 입니다. -------필수 정보가 누락되었습니다. 모든 정보를 확인해주세요.");
      return;
    }

    // 서버에 보낼 데이터
    const requestData = {
      tabNo : data.tabNo,
      manuscriptId : manuscript.id,
      tabId : tabs.id,
      title: data.title,
      content: data.episode,
    };

    console.log("hook에서 최종 데이터 저장",requestData)
    try {
        const response = await saveEpisode(requestData);

        console.log("저장한 후 response",response);
      
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

    // 최근 에피소드 5개 가져오기
  const fetchRecentEpisodes = async () => {
    try {
      const episodes = await getRecentEpisodes(manuscript.user_id);
      setRecentEpisodes(episodes);  // 가져온 에피소드 데이터를 상태에 저장
    //   console.log(]]]]]["가장 최근 수정된 에피소드들:", episodes);
    } catch (error) {
      console.error("❌ 에피소드 가져오기 실패:", error);
      toast.error("최근 에피소드를 불러오는 데 실패했습니다. 다시 시도해주세요.");
    }
  };



  const fetchEpisodesByManuId = async () => {

    try {
      const allEpisodes = await getEpisodesByManuId(manuscript.user_id,manuscript.id);
      setAllEpisodes(allEpisodes);  // 가져온 에피소드 데이터를 상태에 저장
      console.log("해당 manuId에 속하는 모든 에피소드들:", allEpisodes);
    } catch (error) {
      console.error("❌ 에피소드 가져오기 실패:", error);
      toast.error("최근 에피소드를 불러오는 데 실패했습니다. 다시 시도해주세요.");
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
  }, [titleValue, episodeValue ]);

  return {
    methods,
    control,
    handleSubmit,
    errors,
    watch,
    isFormValid,
    onSubmit,
    setValue,
    recentEpisodes,
    fetchRecentEpisodes,
    fetchEpisodesByManuId
  };
};

export default useEpisodeForm;

