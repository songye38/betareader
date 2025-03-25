import { useState, useEffect } from 'react';
import { fetchManuscripts } from '@/models/manuscriptModel'; // 모델에서 API 호출 함수 가져오기
import useAuthStore from '@/store/useAuthStore'; // 로그인된 유저 정보 가져오기

const useManuscripts = () => {
  const user = useAuthStore((state) => state.user); // 로그인된 유저 정보
  const [manuscripts, setManuscripts] = useState([]); // 원고집 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (!user) return; // 유저가 없으면 데이터를 가져오지 않음

    const getManuscripts = async () => {
      setLoading(true); // 로딩 시작
      setError(null); // 에러 초기화

      try {
        const data = await fetchManuscripts(user.id); // 모델에서 데이터 가져오기
        setManuscripts(data); // 데이터 상태 설정
      } catch (err) {
        setError(err.message); // 에러 상태 설정
      }

      setLoading(false); // 로딩 끝
    };

    getManuscripts();
  }, [user]); // user가 변경될 때마다 데이터 요청

  return { manuscripts, loading, error };
};

export default useManuscripts;
