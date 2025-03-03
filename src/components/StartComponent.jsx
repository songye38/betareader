import React from 'react';
import useStore from '@/store/useStore';
import StartSettingBtn from './Buttons/StartSettingBtn';


const StartComponent = () => {
    const { setIsSettingCreated,setSelectedItemType } = useStore();
    //주석추가

    console.log("hellloworld");

    const handleButtonClick = () => {
        // 버튼 클릭 시 설정집이 생성되었다고 상태를 true로 설정
        setIsSettingCreated();
        setSelectedItemType('setting');
      };


  return (
    <div style={{
        width : '100%',
        height:'100%',
        display: 'flex',
        gap: '36px',
        flexDirection: 'column',
        justifyContent: 'center',   // 수직 중앙 정렬
        alignItems: 'center',       // 수평 중앙 정렬
    }}>
    {/* 전체 스타일 설정하는 부분 */}

        {/* 섹션1 - 원고집 시작하기 제목 부분 */}

        <div
            style={{
            width: 512,             // 고정 너비 설정
            display: 'flex',
            flexDirection: 'column', // 세로로 배치
            justifyContent: 'flex-start',
            alignItems: 'center',    // 자식 요소 중앙 정렬
            gap: 10,                 // 텍스트 사이의 간격
            }}
        >
            {/* 첫 번째 텍스트 */}
            <div
            style={{
                color: 'white',
                fontSize: 44,
                fontFamily: 'Pretendard',
                fontWeight: '600',
                lineHeight: '61.6px',
                wordWrap: 'break-word',
            }}
            >
            ‘웹소설 1’ 작성 시작하기
            </div>

            {/* 두 번째 텍스트 */}
            <div
            style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Pretendard',
                fontWeight: '400',
                lineHeight: '28px',
                wordWrap: 'normal',        // 단어가 끊어지지 않도록 설정
                whiteSpace: 'nowrap',      // 텍스트가 한 줄로 표시되도록 설정
            }}
            >
            사용을 위해, 등록하려는 웹소설에 대한 기본 정보 입력이 필요해요
            </div>
        </div>

        {/* 두번째 섹션 */}
        <div
        style={{
            width: 564,
            height: 234,
            paddingLeft: 28,
            paddingRight: 28,
            paddingTop: 24,
            paddingBottom: 24,
            background: '#1E1F24',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px #4A4E5B solid',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 52,
            display: 'inline-flex',
        }}
        >
        <div
            style={{
            alignSelf: 'stretch',
            height: 94,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 16,
            display: 'flex',
            }}
        >
            <div
            style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Pretendard',
                fontWeight: '600',
                lineHeight: '28px',
                wordWrap: 'break-word',
            }}
            >
            기본 설정집 입력
            </div>
            <div
            style={{
                color: '#989DAF',
                fontSize: 18,
                fontFamily: 'Pretendard',
                fontWeight: '400',
                lineHeight: '25.20px',
                wordWrap: 'break-word',
            }}
            >
            작성한 원고의 성격에 맞는 AI 가상 독자를 만들기 위해 원고집의 기본
            <br />
            설정(제목, 장르 등)을 입력해주세요
            </div>
        </div>
        <StartSettingBtn onClick={handleButtonClick} />
        </div>
        
    </div>

  );
};

export default StartComponent;




