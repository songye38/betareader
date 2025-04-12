import { useState } from 'react';
import { createEnvironment,getEnvironmentsByManuscript,deleteEnvironmentById,getEnvironmentByManuscript,updateEnvironment } from '@/models/EnvironmentModel';
import { useForm } from 'react-hook-form';
import { getEnvironmentTypeKo } from '@/utils/typeMappings';

const useEnvironment = () => {
  const [environments, setEnvironments] = useState([]);
  const [environment, setEnvironment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



      const methods = useForm({
        defaultValues: {
          title : '',
          dropdown : '',
          description : '',
          newKeywords: [],
          note : '',
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
  const fetchEnvironments = async (manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEnvironmentsByManuscript(manuscriptId);
      setEnvironments(data);
    } catch (err) {
      setError(err.message || '세계관 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

const fetchEnvironment = async (id, manuscriptId) => {
  setLoading(true);
  setError(null);

  try {
    const data = await getEnvironmentByManuscript(id, manuscriptId);

    console.log("받아오는 data는",data);
    setEnvironment(data);

    methods.reset({
      title: data.title || '',
      dropdown: getEnvironmentTypeKo(data.type) || '',
      description: data.description || '',
      newKeywords: data.reference_list || [],
      note : data.notes || '',
    });
  } catch (err) {
    setError(err.message || '세계관 불러오기 실패');
  } finally {
    setLoading(false);
  }
};

  // 아이디어 추가
  const addEnvironment = async (environment, manuscriptId) => {

    console.log("여기 들어오나?",environment);
    setLoading(true);
    setError(null);
    try {
      const newEnvironment = await createEnvironment(environment, manuscriptId);
      setEnvironments((prev) => [newEnvironment, ...prev]); // 새로 추가한 아이디어 맨 앞에 넣기
    } catch (err) {
      setError(err.message || '세계관 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const deleteEnvironment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEnvironmentById(id);
      setEnvironments((prev) => prev.filter((env) => env.id !== id)); // 삭제된 항목 제외
    } catch (err) {
      setError(err.message || '세계관 삭제 실패');
    } finally {
      setLoading(false);
    }
  };

  const editEnvironment = async (updatedEnvironment, environmentId, manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const newData = await updateEnvironment(updatedEnvironment, environmentId, manuscriptId);
      setEnvironments((prev) =>
        prev.map((item) => (item.id === environmentId ? newData : item))
      );
      setEnvironment(newData); // ✅ setIdea → setEnvironment 으로 수정
    } catch (err) {
      setError(err.message || '세계관 수정 실패');
    } finally {
      setLoading(false);
    }
  };
  

  return {
    editEnvironment,
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    setValue,
    getValues,
    environments,
    loading,
    error,
    fetchEnvironments,
    addEnvironment,
    handleKeywordChange,
    deleteEnvironment,
    fetchEnvironment,
    environment,
  };
};

export default useEnvironment;
