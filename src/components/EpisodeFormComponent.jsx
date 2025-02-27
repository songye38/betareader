'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import useStore from '@/store/useStore'; // Zustand 스토어 사용
import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';

const EpisodeFormComponent = () => {

    const { tabs } = useStore(); // Zustand에서 상태 가져오기
    const selectedTab = tabs.find(tab => tab.selected); // 선택된 탭 찾기

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',  
      episode : '',
      dropdown : [],
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
            <div style={{display:'flex',flexDirection:'row',gap:'12px'}}>
                <TitleInput control={control} error={errors.title} showLabel={false} />
                <DropdownInput control={control} error={errors.dropdown}/>
            </div>
            <EpisodeInput control={control} error={errors.episode} />

            {/* <button type="submit" style={{ padding: '10px', backgroundColor: '#4A90E2', color: 'white', borderRadius: '5px' }}>
                제출
            </button> */}
            <div
                style={{
                    width: '100%',
                    paddingTop: 24,
                    paddingBottom: 24,
                    paddingLeft: 888,
                    paddingRight: 24,
                    //background: '#121212',
                    borderTop: '1px #3A3D46 solid',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    display: 'inline-flex',
                }}
                >
                {/* 여기에 긴 가로줄이 해당됩니다. */}
                <CheckCommentBtn />
                </div>
        </form>


    </div>
  );
};

export default EpisodeFormComponent;
