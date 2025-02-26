'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import useStore from '@/store/useStore'; // Zustand 스토어 사용


const EpisodeFormComponent = () => {

    const { tabs } = useStore(); // Zustand에서 상태 가져오기
    const selectedTab = tabs.find(tab => tab.selected); // 선택된 탭 찾기

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
        {selectedTab.label}
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
