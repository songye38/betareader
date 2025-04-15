import { useState, useEffect } from 'react';
import { fetchManuscriptsByUserId,updateManuscriptCount } from '@/models/manuscriptModel';
import { deleteManuscriptById } from '@/models/manuscriptModel'; // ✅ 삭제 함수 import
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import useManuscriptStore from '@/store/useManuscriptStore';

const useManuscripts = (limit = null) => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manuscripts,setManuscripts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const getManuscripts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchManuscriptsByUserId(user.id, limit);
        setManuscripts(data); //전체 데이터 저장 
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    getManuscripts();
  }, [user, router.pathname, limit]);

  // ✅ 삭제 함수 추가
  const deleteManuscript = async (manuscriptId) => {
    try {
      await deleteManuscriptById(manuscriptId); // 실제 삭제
      const updated = await fetchManuscriptsByUserId(user.id, limit); // 목록 갱신
      setManuscript(updated); // 상태 갱신
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ 에피소드 수 1 증가 함수
  const incrementManuscriptEpisodeCount = async (manuscriptId) => {
    try {
      const updated = await updateManuscriptCount(manuscriptId);
      if (!updated) {
        console.warn("에피소드 수 업데이트 실패");
      } else {
        console.log("에피소드 수 업데이트 성공", updated);
      }
    } catch (error) {
      console.error("에피소드 수 업데이트 중 에러:", error.message);
    }
  };

  return {loading, error, deleteManuscript,incrementManuscriptEpisodeCount,manuscripts }; // ✅ deleteManuscript도 반환
};

export default useManuscripts;
