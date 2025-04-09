import { useState, useEffect } from 'react';
import { fetchManuscriptsByUserId } from '@/models/manuscriptModel';
import { deleteManuscriptById } from '@/models/manuscriptModel'; // ✅ 삭제 함수 import
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import useManuscriptStore from '@/store/useManuscriptStore';

const useManuscripts = (limit = null) => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { manuscript, setManuscript } = useManuscriptStore();

  useEffect(() => {
    if (!user) return;

    const getManuscripts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchManuscriptsByUserId(user.id, limit);
        setManuscript(data);
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

  return { manuscript, loading, error, deleteManuscript }; // ✅ deleteManuscript도 반환
};

export default useManuscripts;
