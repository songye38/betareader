'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import GenreInput from './FormComponents/GenreInput';
import AgeInput from './FormComponents/AgeInput';
import PlotInput from './FormComponents/PlotInput';
import KeywordInput from './FormComponents/KeywordInput';
import CharactersInput from './FormComponents/CharactersInput';

const SettingFormComponent = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',  
      genre: [],  
      age: [],
      plot: '',
      keywords: [],
      characters: [{ name: '', role: '', description: '' }], // ✅ 인물 초기값 추가
    }
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <TitleInput control={control} error={errors.title} showLabel={true} />


      <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
        <GenreInput control={control} error={errors.genre} />
        <AgeInput control={control} error={errors.age} />
      </div>

      <PlotInput control={control} error={errors.plot} />

      <KeywordInput control={control} error={errors.keywords} />

      {/* ✅ CharactersInput 추가됨 */}
      <CharactersInput control={control} error={errors.characters} />

      <button type="submit" style={{ padding: '10px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '5px' }}>
        제출
      </button>
    </form>
  );
};

export default SettingFormComponent;
