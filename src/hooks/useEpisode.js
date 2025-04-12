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
    const {tabs,selectedTab} = useTabStore();
    const {user} = useAuthStore();

    
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
        title: '무제',
        content: '',
        },
        mode: 'onChange',
    });
  
  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  
  const titleValue = watch('title');
  const episodeValue = watch('content');
  
  const isFormValid = titleValue && episodeValue !== '';

  // 폼 제출 함수
  const onSubmit = async (data) => {
    if (!manuscript.id || !selectedTab.id || !data.title || !data.content) {
      toast.info("필수 정보가 누락되었습니다.");
      return null; // 실패 시 명확하게 null 반환
    }
  
    const requestData = {
      tabNo: selectedTab.no,
      manuscriptId: manuscript.id,
      tabId: selectedTab.id,
      title: data.title,
      content: data.content,
    };
  
    try {
      const response = await saveEpisode(requestData);
  
      console.log("저장한 후 response", response);
  
      if (!response || response.error) {
        console.error("❌ API 실패 상세 정보:", response);
        toast.error("에피소드 저장에 실패했습니다. 다시 시도해주세요.");
        return null;
      }
  
      toast.success("에피소드가 성공적으로 저장되었습니다!");
  
      return response; // ✅ 성공 시 리턴!
      
    } catch (error) {
      console.error("❌ 요청 중 에러 발생:", error);
  
      if (error.response) {
        console.error("🔍 서버 응답 error.response:", error.response);
      } else if (error.request) {
        console.error("🔍 요청은 갔지만 응답 없음 error.request:", error.request);
      } else {
        console.error("🔍 기타 에러 메시지:", error.message);
      }
  
      toast.error("에피소드 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      return null; // 실패 시에도 명확하게 null 반환
    }
  };
    

    // 최근 에피소드 5개 가져오기
  const fetchRecentEpisodes = async () => {
    try {
      const episodes = await getRecentEpisodes(user.id);
      setRecentEpisodes(episodes);  // 가져온 에피소드 데이터를 상태에 저장
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

