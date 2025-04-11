import { useState } from 'react';
import { createIdea,getIdeasByManuscript } from '@/models/IdeaModel';

const useIdea = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    ideas,
    loading,
    error,
    fetchIdeas,
    addIdea,
  };
};

export default useIdea;
