'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';


const EpisodeFormComponent = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',  
      episode : '',
    }
  });

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <div>
         <div
        style={{
            color: 'white',
            fontSize: 36,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            lineHeight: '50.4px',
            wordWrap: 'break-word',
        }}
        >
        1화
    </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <TitleInput control={control} error={errors.title} />
        <EpisodeInput control={control} error={errors.episode} />


        <button type="submit" style={{ padding: '10px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '5px' }}>
            제출
        </button>
        </form>

    </div>
   
  );
};

export default EpisodeFormComponent;
