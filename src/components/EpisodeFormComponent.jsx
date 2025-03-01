'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import useStore from '@/store/useStore';
import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';
import { toast, Slide } from 'react-toastify';

const EpisodeFormComponent = () => {
  const { tabs } = useStore();
  const selectedTab = tabs.find(tab => tab.selected);

  console.log("selectedTab",selectedTab);

  const methods = useForm({
    defaultValues: {
      title: '',
      episode: '',
      dropdown: '', 
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue } = methods;

  // 드롭다운 값 변경 핸들러 -> react-hook-form 상태에 업데이트
  const handleDropdownChange = (value) => {
    setValue('dropdown', value);
  };

  const onSubmit = (data) => {
    console.log('📌 Form Data:', data);
  };

  // 각 필드의 값 추적
  const titleValue = watch('title');
  const episodeValue = watch('episode');
  const dropdownValue = watch('dropdown');

  // 유효성 검사
  const isFormValid = titleValue && episodeValue && dropdownValue !== '';

  // 버튼 클릭 시 동작
  const handleButtonClick = () => {
    if (isFormValid) {
      toast.success("폼이 성공적으로 제출되었습니다!", {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: "dark",
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
      handleSubmit(onSubmit)();  // 폼 제출 실행
    } else {
      toast.error("폼을 모두 작성해주세요!", {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: true,
        closeButton: true,
        theme: "dark",
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
      });
    }
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
        }}
      >
        {selectedTab.label}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <TitleInput control={control} error={errors.title} showLabel={false} />
            <DropdownInput control={control} error={errors.dropdown} onDropdownChange={handleDropdownChange} />
          </div>
          
          {/* EpisodeInput에 control 추가! */}
          <EpisodeInput control={control} error={errors.episode} />

          <div
            style={{
              width: '100%',
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: 888,
              paddingRight: 24,
              borderTop: '1px #3A3D46 solid',
              justifyContent: 'flex-end',
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <CheckCommentBtn disabled={!isFormValid} onClick={handleButtonClick} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EpisodeFormComponent;
