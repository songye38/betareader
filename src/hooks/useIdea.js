import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createIdea,getIdeasByManuscript ,getIdeaByManuscript} from '@/models/IdeaModel';

const useIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const methods = useForm({
      defaultValues: {
        title : '',
        dropdown : '',
        episode : '',
        newKeywords: [],
      },
      mode: 'onChange',
    });
  
    const { control, handleSubmit, formState: { errors }, watch, setValue ,getValues} = methods;

    const handleKeywordChange = (updatedKeywords) => {
      console.log("handleKeywordChange 호출됨");

      //TODO 이 부분 잠시 블럭처ㅣㄹ
      setValue('newKeywords', updatedKeywords);
      
      // watch로 최신 상태 가져오기
      console.log("키워드 업데이트:", watch("newKeywords")); 
  }

  // 아이디어 목록 불러오기
  const fetchIdeas = async (manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIdeasByManuscript(manuscriptId);
      setIdeas(data);
    } catch (err) {
      setError(err.message || '아이디어 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  const fetchIdea = async (manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIdeaByManuscript(id,manuscriptId);
      setIdea(data);


      setValue('title', data.title);
      setValue('dropdown',data.dropdown);  // genre 값을 선택으로 설정
      setValue('episode', data.episode);
      setValue('newKeywords', data.newKeywords || []);

    } catch (err) {
      setError(err.message || '아이디어 불러오기 실패');
    } finally {
      setLoading(false);
    }

  };

  // 아이디어 추가
  const addIdea = async (idea, manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const newIdea = await createIdea(idea, manuscriptId);
      setIdeas((prev) => [newIdea, ...prev]); // 새로 추가한 아이디어 맨 앞에 넣기
    } catch (err) {
      setError(err.message || '아이디어 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    setValue,
    getValues,
    ideas,
    loading,
    error,
    fetchIdeas,
    addIdea,
    handleKeywordChange,
    fetchIdea,
  };
};

export default useIdea;
