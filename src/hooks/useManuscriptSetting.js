'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // useRouter import
import supabase from '@/supabase/supabaseClient';
import { transformManuscriptSettingData } from '@/models/manuscriptSettingModel';
import { toast, Slide } from 'react-toastify';

const useManuscriptSetting = () => {

    // useRouter 훅을 사용하여 URL 쿼리 파라미터 접근
  const router = useRouter();  // useRouter 훅 사용
  const { manuscriptId } = router.query; // URL에서 manuscriptId 추출

  const methods = useForm({
    defaultValues: {
      title: '',
      genre: '',
      ageCategory: '',
      plot: '',
      newKeywords: [],
      characters: [{ name: '', role: '', description: '' }],
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null); // 초기 데이터 상태 추가

  // manuscriptId가 변경되면 데이터를 가져오는 useEffect
  useEffect(() => {
    if (manuscriptId) {
      fetchManuscriptSettingData(); // manuscriptId가 있을 때 데이터 가져오기
    }
  }, [manuscriptId]);

  // manuscript_setting 테이블에서 데이터 가져오기
  const fetchManuscriptSettingData = async () => {
    setLoading(true); // 데이터 로딩 시작

    try {
      const { data, error } = await supabase
        .from('manuscript_setting')
        .select('*')
        .eq('manuscript_id', manuscriptId) // manuscriptId로 필터링
        .maybeSingle(); // 하나의 데이터만 가져옴

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        console.warn("⚠️ 해당 manuscriptId에 대한 데이터가 없습니다.");
        return; // 데이터가 없으면 함수 종료
      }

      // 가져온 데이터로 폼에 기본값 설정
      setInitialData(data);
      
      // 필드 값 설정
      setValue('title', data.title);
      setValue('genre', data.genre);  // genre 값을 선택으로 설정
      setValue('ageCategory', data.age_category);
      setValue('plot', data.plot);
      setValue('newKeywords', data.keywords || []);
      setValue('characters', data.characters || [{ name: '', role: '', description: '' }]);

    } catch (error) {
      console.error('❌ 데이터 로딩 실패:', error.message);
      toast.error('데이터를 가져오는 중 오류가 발생했습니다.', { position: 'bottom-center', autoClose: 1200, theme: 'dark', transition: Slide });
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  const handleKeywordChange = (updatedKeywords) => {
    console.log("handleKeywordChange 호출됨");
    setValue('newKeywords', updatedKeywords);
    
    // watch로 최신 상태 가져오기
    console.log("키워드 업데이트:", watch("newKeywords")); 
}

  const onSubmit = async (data) => {
    console.log("onsubmit 함수를 호출합니다.");
    if (!manuscriptId) {
      toast.error('manuscriptId를 찾을 수 없습니다.', { position: 'bottom-center', autoClose: 1200, theme: 'dark', transition: Slide });
      return;
    }

    // manuscriptId를 requestData에 추가
    const requestData = { ...data, manuscript_id: manuscriptId };  // manuscript_id를 먼저 추가

    // 데이터를 변환 후 보내기
    const transformedData = transformManuscriptSettingData(requestData); // 변환 함수 호출

    console.log("📌 최종 설정 data", requestData);

    try {
      setLoading(true);
      const { error } = await supabase.from('manuscript_setting').insert([transformedData]);

      if (error) {
        console.error("❌ 저장 실패:", error.message);
        toast.error('설정 저장에 실패했습니다.', { position: 'bottom-center', autoClose: 1200, theme: 'dark', transition: Slide });
      } else {
        toast.success('설정이 성공적으로 저장되었습니다!', { position: 'bottom-center', autoClose: 1200, theme: 'dark', transition: Slide });
      }
    } catch (error) {
      console.error('❌ 요청 에러:', error);
      toast.error('저장 중 오류가 발생했습니다.', { position: 'bottom-center', autoClose: 1200, theme: 'dark', transition: Slide });
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
    onSubmit,
    handleKeywordChange,
    loading,
    initialData,  // 초기 데이터 상태 반환
  };
};

export default useManuscriptSetting;
