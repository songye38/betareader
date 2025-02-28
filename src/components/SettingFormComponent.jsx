'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import GenreInput from './FormComponents/GenreInput';
import AgeInput from './FormComponents/AgeInput';
import PlotInput from './FormComponents/PlotInput';
import KeywordInput from './FormComponents/KeywordInput';
import CharactersInput from './FormComponents/CharactersInput';
import SettingSaveBtn from './Buttons/SettingSaveBtn';

const SettingFormComponent = () => {
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    defaultValues: {
      title: '',  
      genre: [],  
      ageCategory: '',  // 이 부분을 defaultValues에 추가
      plot: '',
      keywords: [],
      characters: [{ name: '', role: '', description: '' }],
    },
    mode: 'onChange', // 폼 값이 변경될 때마다 실시간으로 유효성 검사
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  // 실시간으로 필드 값 추적
  const title = watch('title');
  const genre = watch('genre');
  const ageCategory = watch('ageCategory');  // 여기서 'ageCategory'를 추적
  const plot = watch('plot');

  // Form 값이 변경될 때마다 isValid를 실시간으로 추적
  const formIsValid = title && genre?.length > 0 && ageCategory && plot && !errors.title && !errors.genre && !errors.ageCategory && !errors.plot;

  // 필드 값들 콘솔에 출력
  console.log('title:', title);
  console.log('genre:', genre);
  console.log('ageCategory:', ageCategory);  // 'ageCategory' 값 확인
  console.log('plot:', plot);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* TitleInput에 필수 검증 추가 */}
      <TitleInput 
        control={control} 
        error={errors.title} 
        showLabel={true} 
        rules={{ required: '제목을 입력해주세요.' }} // 필수 입력
      />
      
      <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
        {/* GenreInput에 필수 검증 추가 */}
        <GenreInput 
          control={control} 
          error={errors.genre} 
          rules={{ required: '장르를 선택해주세요.' }} // 필수 입력
        />
        
        {/* AgeInput에 필수 검증 추가 */}
        <AgeInput 
          control={control} 
          error={errors.ageCategory}  // ageCategory로 수정
          rules={{ required: '나이를 선택해주세요.' }} // 필수 입력
        />
      </div>

      {/* PlotInput에 필수 검증 추가 */}
      <PlotInput 
        control={control} 
        error={errors.plot} 
        rules={{ required: '줄거리를 입력해주세요.' }} // 필수 입력
      />

      <KeywordInput 
        control={control} 
        error={errors.keywords} 
      />

      <CharactersInput 
        control={control} 
        error={errors.characters} 
      />

      {/* 버튼은 기본적으로 disabled 상태 */}
      <SettingSaveBtn disabled={!formIsValid} />
      {/* <button 
        type="submit" 
        style={{
          padding: '10px',
          backgroundColor: formIsValid ? '#4A90E2' : '#A3C8FF', // formIsValid가 true일 때만 원래 색상, 아니면 비활성화된 색상
          color: 'white',
          borderRadius: '5px',
          cursor: formIsValid ? 'pointer' : 'not-allowed', // 버튼 비활성화 상태에서는 커서도 변경
        }} 
        disabled={!formIsValid} // formIsValid가 true일 때만 버튼이 활성화
      >
        제출
      </button> */}
    </form>
  );
};

export default SettingFormComponent;
