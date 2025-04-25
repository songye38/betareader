'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import TitleInput from './FormComponents/TitleInput';
import GenreInput from './FormComponents/GenreInput';
import AgeInput from './FormComponents/AgeInput';
import PlotInput from './FormComponents/PlotInput';
import KeywordInput from './FormComponents/KeywordInput';
import CharactersInput from './FormComponents/CharactersInput';
import SettingSaveBtn from './Buttons/SettingSaveBtn';
import useManuscriptSetting from '@/hooks/useManuscriptSetting';

const SettingFormComponent = ({ onClose }) => {
  const {
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    onSubmit,
    handleKeywordChange,
    loading,
    getValues,
  } = useManuscriptSetting();

  const title = watch('title');
  const genre = watch('genre');
  const ageCategory = watch('ageCategory');
  const plot = watch('plot');


  // 유효성 검사
  const formIsValid = title && genre?.length > 0 && ageCategory && plot && !errors.title && !errors.genre && !errors.ageCategory && !errors.plot;

  return (
    <div
      style={{
        width: 900,
        maxHeight: "80vh", // 화면 높이의 80%까지만 사용
        overflowY: "auto", // 스크롤 가능하도록 설정
        padding: 36,
        background: "#2C2D34",
        borderRadius: 24,
        border: "1px #4A4E5B solid",
        display: "flex", // ✅ inline-flex 제거
        flexDirection: "column", // ✅ 세로 정렬 유지
        justifyContent: "flex-start", // ✅ 상단부터 정렬 (잘리는 문제 해결)
        alignItems: "center",
        gap: 32,
      }}
    >
      {/* 제목 및 닫기 버튼 */}
      <div
        style={{
          alignSelf: "stretch",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Pretendard",
            fontWeight: "600",
            lineHeight: "28px",
            wordWrap: "break-word",
          }}
        >
          설정집 작성
        </div>

        <img
          src="/close_icon.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* FormProvider로 감싸기 */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}
        >
          {/* 제목 입력 */}
          <TitleInput control={control} error={errors.title} showLabel={true} />

          <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
            <GenreInput
              control={control}
              error={errors.genre}
              getValues={getValues} // getValues 전달
              loading={loading}
            />
            <AgeInput
              control={control}
              error={errors.ageCategory}
              getValues={getValues} // getValues 전달
              loading={loading}
            />
          </div>

          <PlotInput control={control} error={errors.plot} />

          <KeywordInput
            control={control}
            error={errors.newKeywords}
            onKeywordChange={handleKeywordChange}
            getValues={getValues} // getValues 전달
            loading={loading}
          />

          <CharactersInput
            control={control}
            error={errors.characters}
            getValues={getValues} // getValues 전달
            loading={loading}
          />

          {/* 저장 버튼 */}
          <SettingSaveBtn disabled={!formIsValid || loading} />
        </form>
      </FormProvider>
    </div>
  );
};

export default SettingFormComponent;
