import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { saveEpisode,deleteEpisode } from '@/models/episodeModel'; 
import { getRecentEpisodes,getEpisodesByManuId } from '@/models/episodeModel';
import useAuthStore from '@/store/useAuthStore';
import useManuscriptStore from '@/store/useManuscriptStore';
import useTabStore from '@/store/useTabStore';
import useWritingTab from './useWritingTab';
import useManuscripts from './useManuscripts';

const useEpisodeForm = () => {

    const [recentEpisodes, setRecentEpisodes] = useState([]);  // 최근 에피소드 상태
    const [allEpisodes, setAllEpisodes] = useState([]);
    const [isSaving, setIsSaving] = useState(false); // 자동 저장 여부
    const {manuscript} = useManuscriptStore();
    const tabs = useTabStore((state) => state.tabs);
    const selectedTab = useTabStore((state) => state.selectedTab);
    const {user} = useAuthStore();
    const { handleUpdateTab } = useWritingTab(); // ✅ 훅 호출해서 함수 가져오기
    const {incrementManuscriptEpisodeCount} = useManuscripts();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    
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
  
  const { control, handleSubmit, formState: { errors }, watch, setValue,reset } = methods;
  
  const titleValue = watch('title');
  const episodeValue = watch('content');
  
  const isFormValid = titleValue && episodeValue !== '';

  // 폼 제출 함수
  const onSubmit = async (formData, manuscriptId) => {
    console.log("selectedTab",selectedTab.tab_id,);

    if (!manuscriptId || !selectedTab.tab_id || !formData.title || !formData.content) {
      toast.info("여기서 🎯🎯🎯🎯🎯🎯🎯🎯필수 정보가 누락되었습니다.");
      return null;
    }

    const requestData = {
      tabNo: selectedTab.tab_no,
      manuscriptId,
      tabId: selectedTab.tab_id,
      title: formData.title,
      content: formData.content,
    };

    setLoading(true);
    setError(null); // 이전 에러 초기화

    try {
      const response = await saveEpisode(requestData);

      if (!response || response.error) {
        throw new Error("에피소드 저장에 실패했습니다. 다시 시도해주세요.");

      }

      console.log("저장한 후 response", response);
      console.log("저장 전 tabs", tabs);


      // 상태 업데이트는 여기!
      handleUpdateTab(response.tab_id, {
        title: response.title,
        content: response.content,
        status: '작성중',
        created_at: response.created_at,
        id: response.id,
        last_edited_at: response.last_edited_at,
        manuscript_id: response.manuscript_id,
        selected: true,
        tab_id: response.tab_id,
        tab_no: response.tab_no,
      });

      console.log("tabs",tabs);

      
  
      // ✅ episode_count 증가
      await incrementManuscriptEpisodeCount(manuscriptId);

      toast.success("에피소드가 성공적으로 저장되었습니다!");
      return response;

    } catch (err) {
      console.error("❌ 요청 중 에러 발생:", err);
      setError(err.message || "알 수 없는 에러가 발생했습니다.");
      toast.error("에피소드 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      return null;

    } finally {
      
      setLoading(false);
    }
  };
  
    

    // 최근 에피소드 5개 가져오기
  const fetchRecentEpisodes = async () => {
    setLoading(true);
    setError(null); // 에러 초기화
  
    try {
      const episodes = await getRecentEpisodes(user.id);
      setRecentEpisodes(episodes); // 성공 시 상태 저장
    } catch (err) {
      console.error("❌ 에피소드 가져오기 실패:", err);
      setError(err.message || "최근 에피소드를 불러오는 데 실패했습니다.");
      toast.error("최근 에피소드를 불러오는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };


  const fetchEpisodesByManuId = async (userId,manuscriptId) => {
    setLoading(true); // 요청 시작 시 로딩 상태 활성화
    setError(null); // 이전 에러 초기화
  
    try {
      const allEpisodes = await getEpisodesByManuId(userId, manuscriptId);
      setAllEpisodes(allEpisodes);  // 가져온 에피소드 데이터를 상태에 저장
      return allEpisodes; 
    } catch (err) {
      console.error("❌ 에피소드 가져오기 실패:", err);
      setError(err.message || "에피소드를 불러오는 데 실패했습니다."); // 에러 상태 업데이트
      toast.error("최근 에피소드를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      return []; 
    } finally {
      setLoading(false); // 로딩 끝났으므로 로딩 상태 비활성화
    }
  };

  // 에피소드 삭제 함수
  const handleDeleteEpisode = async (episodeId) => {
    setLoading(true);
    setError(null); // 에러 초기화

    try {
      const deletedData = await deleteEpisode(episodeId); // deleteEpisode 호출하여 삭제
      // 삭제된 에피소드 리스트 업데이트
      setAllEpisodes((prev) => prev.filter((episode) => episode.id !== episodeId));
      toast.success("에피소드가 성공적으로 삭제되었습니다!");
    } catch (err) {
      console.error("❌ 에피소드 삭제 실패:", err);
      setError(err.message || "에피소드를 삭제하는 데 실패했습니다.");
      toast.error("에피소드를 삭제하는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };


  return {
    methods,
    reset,
    control,
    handleSubmit,
    errors,
    watch,
    isFormValid,
    onSubmit,
    setValue,
    recentEpisodes,
    fetchRecentEpisodes,
    fetchEpisodesByManuId,
    allEpisodes,
    handleDeleteEpisode,
  };
};

export default useEpisodeForm;

