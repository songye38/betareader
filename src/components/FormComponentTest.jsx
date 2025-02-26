'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import GenreInput from './FormComponents/GenreInput';
import AgeInput from './FormComponents/AgeInput';
import PlotInput from './FormComponents/PlotInput';
import KeywordInput from './FormComponents/KeywordInput';

const FormComponentTest = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',  // 제목 초기값
      genre: [],  // 장르 초기값을 빈 배열로 설정
      age : [],
      plot : '',
      keywords : [],
    }
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* TitleInput 컴포넌트 */}
      <TitleInput control={control} error={errors.title} />
      
      {/* GenreInput과 AgeInput을 한 줄로 배치하기 위한 div */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
        {/* GenreInput 컴포넌트 */}
        <GenreInput control={control} error={errors.genre} />
        
        {/* AgeInput 컴포넌트 */}
        <AgeInput control={control} error={errors.age} />
      </div>

      <PlotInput control={control} error={errors.plot} />

      <KeywordInput control={control} error={errors.keywords} />
      
      {/* 제출 버튼 */}
      <button type="submit" style={{ padding: '10px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '5px' }}>
        제출
      </button>
    </form>
  );
};

export default FormComponentTest;
