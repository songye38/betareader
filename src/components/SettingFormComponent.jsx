'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import GenreInput from './FormComponents/GenreInput';
import AgeInput from './FormComponents/AgeInput';
import PlotInput from './FormComponents/PlotInput';
import KeywordInput from './FormComponents/KeywordInput';
import CharactersInput from './FormComponents/CharactersInput';
import SettingSaveBtn from './Buttons/SettingSaveBtn';


const SettingFormComponent = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const methods = useForm({
    defaultValues: {
      title: '',
      genre: [],
      ageCategory: '',
      plot: '',
      newKeywords: [], // newKeywords를 react-hook-form의 상태로 관리
      characters: [{ name: '', role: '', description: '' }],
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, formState: { errors, isValid }, watch, setValue } = methods;

  // const onSubmit = (data) => {
  //   console.log('Form Data: ', data);
  // };

  const onSubmit = async (data) => {

    console.log("최종 설정집 data",data);
    // 데이터를 서버에 맞게 변환
    const requestData = {
      title: data.title,
      topic: data.plot,  // topic은 필요없다. 
      plot: data.plot,
      genre: data.genre[0],  // genre가 배열로 되어있으므로 첫 번째 값만 사용
      ageGroup: data.ageCategory,  // 'ageCategory' -> 'ageGroup'으로 이름 변경
      keywords: data.newKeywords,
      authorId: 0,  // 예시로 0으로 설정, 실제 값은 로그인한 사용자 ID 등으로 대체 필요
      characters: data.characters.map((character) => ({
        role: character.role,
        name: character.name,
        introduction: character.description, // 'description' -> 'introduction'으로 이름 변경
      })),
    };
  
    console.log('📌 Data to send:', requestData);
  
    try {
      const response = await fetch(`${API_BASE_URL}/novels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),  // 데이터를 JSON 형식으로 변환하여 보냄
      });
  
      // HTTP 상태 코드가 2xx인 경우는 성공, 아니면 에러 처리
      if (!response.ok) {
        const errorData = await response.json();  // 서버에서 에러 메시지 받기
        throw new Error(`소설 저장에 실패했습니다: ${errorData.message || '알 수 없는 오류'}`);
      }
  
      const responseData = await response.json();  // 응답 데이터를 JSON으로 파싱
      console.log('📌 Response Data:', responseData);  // 응답 데이터 확인
  
      // 성공적으로 저장되었을 때 처리
      toast.success('소설이 성공적으로 저장되었습니다!', {
        position: 'bottom-center',
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: 'dark',
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
  
    } catch (error) {
      console.error('Error:', error);
      toast.error('소설 저장 중 오류가 발생했습니다. 다시 시도해주세요.', {
        position: 'bottom-center',
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: 'dark',
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
    }
  };
  
  

  // 실시간으로 필드 값 추적
  const title = watch('title');
  const genre = watch('genre');
  const ageCategory = watch('ageCategory');
  const plot = watch('plot');
  const newKeywords = watch('newKeywords'); // react-hook-form에서 keywords 상태 추적

  // Form 값이 변경될 때마다 isValid를 실시간으로 추적
  const formIsValid = title && genre?.length > 0 && ageCategory && plot && !errors.title && !errors.genre && !errors.ageCategory && !errors.plot;

  // 키워드 상태 변경 함수
  const handleKeywordChange = (updatedKeywords) => {
    // react-hook-form에 있는 setValue를 사용하여 newKeywords 값을 업데이트
    setValue('newKeywords', updatedKeywords);  // 폼 상태에 직접 반영
  };

  return (
    // FormProvider로 감싸기
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* TitleInput에 필수 검증 추가 */}
        <TitleInput 
          control={control} 
          error={errors.title} 
          showLabel={true} 
          rules={{ required: '제목을 입력해주세요.' }} 
        />
        
        <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
          {/* GenreInput에 필수 검증 추가 */}
          <GenreInput 
            control={control} 
            error={errors.genre} 
            rules={{ required: '장르를 선택해주세요.' }} 
          />
          
          {/* AgeInput에 필수 검증 추가 */}
          <AgeInput 
            control={control} 
            error={errors.ageCategory}  
            rules={{ required: '나이를 선택해주세요.' }} 
          />
        </div>

        {/* PlotInput에 필수 검증 추가 */}
        <PlotInput 
          control={control} 
          error={errors.plot} 
          rules={{ required: '줄거리를 입력해주세요.' }} 
        />

        {/* KeywordInput에 키워드 상태와 변경 함수 전달 */}
        <KeywordInput 
          control={control} 
          error={errors.newKeywords} 
          newKeywords={newKeywords} // 키워드 상태 전달
          onKeywordChange={handleKeywordChange} // 키워드 변경 함수 전달
        />

        <CharactersInput 
          control={control} 
          error={errors.characters} 
        />

        {/* 버튼은 기본적으로 disabled 상태 */}
        <SettingSaveBtn disabled={!formIsValid} onClick={handleSubmit(onSubmit)} />
      </form>
    </FormProvider>
  );
};

export default SettingFormComponent;
