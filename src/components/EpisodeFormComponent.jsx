'use client';

import { useState } from 'react'; // useState 추가
import { useForm, FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import EpisodeInput from './FormComponents/EpisodeInput';
import useStore from '@/store/useStore'; // Zustand 스토어 사용
import DropdownInput from './FormComponents/DropdownInput';
import CheckCommentBtn from './Buttons/CheckCommentBtn';

const EpisodeFormComponent = () => {
  const { tabs } = useStore(); // Zustand에서 상태 가져오기
  const selectedTab = tabs.find(tab => tab.selected); // 선택된 탭 찾기

  // react-hook-form에서 필요한 메서드와 상태값을 받기
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    defaultValues: {
      title: '',
      episode: '',
      dropdown: '', // 드롭다운의 기본 값은 빈 문자열
    },
    mode: 'onChange', // onChange 모드로 설정하여 입력 시마다 유효성 검사
  });

  // 상위 컴포넌트에서 드롭다운 값을 관리할 상태 추가
  const [dropdownValue, setDropdownValue] = useState(''); 

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
  };

  // watch를 사용하여 각 필드의 값을 실시간으로 추적
  const titleValue = watch('title');
  const episodeValue = watch('episode');

  // 드롭다운 값이 변경될 때 처리하는 함수
  const handleDropdownChange = (value) => {
    setDropdownValue(value); // 드롭다운에서 선택된 값을 상태에 저장
  };

  // 폼이 유효한지 여부 확인
  const isFormValid = titleValue && episodeValue && dropdownValue !== '';

  console.log("title", titleValue);
  console.log("episodeValue", episodeValue);
  console.log("dropdownValue", dropdownValue);
  console.log("isFormValid", isFormValid);

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

      {/* FormProvider로 감싸기 */}
      <FormProvider {...{ control, handleSubmit, errors, watch }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <TitleInput control={control} error={errors.title} showLabel={false} />
            {/* DropdownInput에 handleDropdownChange를 전달 */}
            <DropdownInput error={errors.dropdown} onDropdownChange={handleDropdownChange} />
          </div>
          <EpisodeInput error={errors.episode} />

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
            {/* isValid 대신 isFormValid 사용 */}
            <CheckCommentBtn disabled={!isFormValid} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EpisodeFormComponent;
