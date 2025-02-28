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

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
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
