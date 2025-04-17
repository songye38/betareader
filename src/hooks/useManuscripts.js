import { useState, useEffect } from 'react';
import { fetchManuscriptsByUserId,updateEpisodeCount,updateLastEditedAt } from '@/models/manuscriptModel';
import { deleteManuscriptById } from '@/models/manuscriptModel'; // ✅ 삭제 함수 import
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import useManuscriptStore from '@/store/useManuscriptStore';
import { useCallback } from 'react';

const useManuscripts = (limit = null) => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manuscripts,setManuscripts] = useState([]);
  const router = useRouter();

  // 🔁 외부로 분리된 함수 (useCallback으로 최적화)
  const getManuscripts = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchManuscriptsByUserId(user.id, limit);
      setManuscripts(data); // 전체 데이터 저장
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }, [user, limit, setManuscripts, setLoading, setError]);

  // ✅ 1. 메인 페이지 진입 시 호출
  useEffect(() => {
    if (router.pathname === '/') {
      getManuscripts();
    }
  }, [router.pathname, getManuscripts]);

  // ✅ 2. 브라우저 포커스 복귀 시 호출
  useEffect(() => {
    const handleFocus = () => {
      if (router.pathname === '/') {
        getManuscripts();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [router.pathname, getManuscripts]);




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
  const incrementManuscriptEpisodeCount = async (manuscriptId, delta = 1) => {
    try {
      const updated = await updateEpisodeCount(manuscriptId, delta); // delta 넘겨줌
      if (!updated) {
        console.warn("에피소드 수 업데이트 실패");
      } else {
        console.log("에피소드 수 업데이트 성공", updated);
      }
    } catch (error) {
      console.error("에피소드 수 업데이트 중 에러:", error.message);
    }
  };


    // ✅ manuscript의 last_edited_at 수정
  const updateManuscriptEpisodeEditedAt = async (manuscriptId) => {
    try {
      const updated = await updateLastEditedAt(manuscriptId); // delta 넘겨줌
      if (!updated) {
        console.warn("새로운 시간 정보 가져오기 실패");
      } else {
        console.log("last_edited_at 업데이트 성공", updated);
      }
    } catch (error) {
      console.error("last_edited_at 업데이트 중 에러:", error.message);
    }
  };
  

  return {loading, error, deleteManuscript,incrementManuscriptEpisodeCount,manuscripts,updateManuscriptEpisodeEditedAt }; // ✅ deleteManuscript도 반환
};

export default useManuscripts;
