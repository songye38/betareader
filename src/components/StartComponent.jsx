import React from 'react';
import { useRouter } from 'next/router';
import useStore from '@/store/useStore'; // Zustand 사용
import StartSettingBtn from './Buttons/StartSettingBtn';
import Button1 from './Buttons/Button1';

const StartComponent = () => {
    const router = useRouter();
    const { manuscripts, addTab, setSelectedTab, currentManuscriptId, incrementManuscriptId,selectedTab,tabs } = useStore();


    //설정집 추가와 관련된 함수
    const handleButtonClick = () => {
        // 이미 설정집 탭이 존재하는지 확인
        const settingsTabExists = tabs.some(tab => tab.id === 'settings');

        if (settingsTabExists) {
            // 설정집 탭이 이미 존재하면 아무 것도 하지 않음
            return;
        }

        // 설정집 탭 추가 로직
        const newTab = {
            type : 'setting',
            id: 'settings',  // 설정집 탭 ID (고정)
            label: '설정집',  // 탭 이름
            EpisodeId: null,  // 원고와 관련 없음
            selected: true,  // 새 탭은 기본으로 선택됨
        };

        addTab(newTab);  // Zustand 상태 업데이트로 새 탭 추가


        router.push({
            pathname: router.pathname, // 현재 경로 유지
            query: { ...router.query, tab: newTab.id }, // tab 파라미터를 새로운 탭 ID로 업데이트
          });

        // 현재 탭이 'settings' 탭이 아닐 때만 설정
        if (selectedTab !== 'settings') {
            setSelectedTab(newTab.id);  // 새 탭 선택
        }
    };

    // 원고지 추가와 관련된 함수 
    const handleAddTab = () => {
        const newTabId = Date.now(); // 고유한 ID 생성
        const newEpisodeId = currentManuscriptId; // 현재 원고 ID 사용
      
        const newTab = {
          type: 'episode',
          id: newTabId,
          label: `${newEpisodeId}화`,
          EpisodeId: newEpisodeId,
          selected: true,
        };
      
        addTab(newTab); // Zustand 상태 업데이트
        
        // 현재 탭이 새로 추가된 탭과 다를 경우에만 선택
        if (newTabId !== selectedTab) {
          setSelectedTab(newTabId); // 새 탭을 활성화
        }
      
        // 탭을 추가한 후, URL을 해당 탭 ID로 업데이트
        router.push({
          pathname: router.pathname, // 현재 경로 유지
          query: { ...router.query, tab: newTabId }, // tab 파라미터를 새로운 탭 ID로 업데이트
        });
      
        incrementManuscriptId(); // 다음 원고 ID 증가
      };
      

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // 가로 중앙 정렬
            alignItems: 'center',     // 세로 중앙 정렬
            height: '100vh',          // 화면 전체 높이를 차지하도록
            width: '100%'             // 화면 전체 너비를 차지하도록
          }}>
            <div style={{display:'flex',flexDirection:'column',gap:'52px',justifyContent: 'center',  alignItems: 'center'}}>
                <div style={{display:'flex',flexDirection:'column',gap:'11px',justifyContent: 'center',  alignItems: 'center'}}>
                    <img src="/book_icon.svg" alt="Profile" width={45} height={45} />
                    <div style={{
                        color: 'white',
                        fontSize: 44,
                        fontFamily: 'Pretendard',
                        fontWeight: '600',
                        lineHeight: '61.6px',
                        wordWrap: 'break-word'
                        }}>
                    악역에게 꽃길을 깔아주려 합니다
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'row',gap:'24px'}}>
                    {/* 기본 설정집 수정 섹션 */}
                    <div
                        style={{
                        width: 466,
                        height: 88,
                        paddingLeft: 28,
                        paddingRight: 28,
                        paddingTop: 24,
                        paddingBottom: 24,
                        background: '#1E1F24',
                        borderRadius: 20,
                        overflow: 'hidden',
                        border: '1px #4A4E5B solid',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        display: 'inline-flex',
                        }}
                    >
                        <div
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: 16,
                            display: 'inline-flex',
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
                            기본 설정집 작성
                        </div>
                        </div>
                        <StartSettingBtn onClick={handleButtonClick} />
                    </div>
                    {/* 원고집 추가 섹션 */}
                    <div
                        style={{
                        width: 466,
                        height: 88,
                        paddingLeft: 28,
                        paddingRight: 28,
                        paddingTop: 24,
                        paddingBottom: 24,
                        background: '#1E1F24',
                        borderRadius: 20,
                        overflow: 'hidden',
                        border: '1px #4A4E5B solid',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        display: 'inline-flex',
                        }}
                    >
                        <div
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: 16,
                            display: 'inline-flex',
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
                            새 원고지 작성
                        </div>
                        </div>
                        <Button1 onClick={handleAddTab} type={'default'} />
                    </div>
                </div>
            </div>
        </div>
      );
};

export default StartComponent;
