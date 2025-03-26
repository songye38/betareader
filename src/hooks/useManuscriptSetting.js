'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // useRouter import
import supabase from '@/supabase/supabaseClient';
import { transformManuscriptSettingData } from '@/models/manuscriptSettingModel';
import { toast, Slide } from 'react-toastify';

const useManuscriptSetting = () => {
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

  // 로딩 상태에서 manuscriptId가 존재하지 않으면 폼을 비활성화
  useEffect(() => {
    if (!manuscriptId) {
      // manuscriptId가 없을 때, 예를 들어, 페이지가 로드되기 전이면 처리를 할 수 있습니다.
      console.error('manuscriptId가 URL에서 찾을 수 없습니다.');
    }
  }, [manuscriptId]);

  const handleKeywordChange = (updatedKeywords) => {
    setValue('newKeywords', updatedKeywords);
  };

  const onSubmit = async (data) => {
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
  };
};

export default useManuscriptSetting;
