import { useState } from 'react';
import { createEnvironment,getEnvironmentsByManuscript } from '@/models/EnvironmentModel';

const useEnvironment = () => {
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // 아이디어 추가
  const addEnvironment = async (environment, manuscriptId) => {
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

  return {
    ideas,
    loading,
    error,
    fetchEnvironments,
    addEnvironment,
  };
};

export default useEnvironment;
