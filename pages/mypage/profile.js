'use client';
import { useState } from "react"; // react에서 useState를 올바르게 불러옵니다.

const Profile = ({ userId, manuscriptId }) => { // 컴포넌트 이름 대문자로 수정

    const [nickname, setNickname] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // 변경 내용 저장 버튼 클릭 시 호출될 함수
    const handleSubmit = async () => {
      if (!nickname.trim()) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      const requestData = {
        userId,
        nickname,
      };

      console.log("서버로 보낼 데이터:", requestData);

      // TODO: 서버에 requestData를 보낼 fetch 또는 axios 요청 추가
    };

    return (
      <div style={{'display':'flex',flexDirection:'column',gap:'40px',justifyContent: 'center',alignItems: 'center',width:'100%'}}>
          {/* 섹션 1. 헤더 부분 */}
          <div style={{
              width: '100%', 
              height: '69px', 
              position: 'relative', 
              padding: '0 242px', // 텍스트가 적당히 가운데 배치되도록 여백 설정
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
          }}>
              <div style={{
                  width: '100%', 
                  height: '2px', 
                  backgroundColor: '#4A4E5B', // 라인 색상 설정
                  position: 'absolute', 
                  top: '100%' // 하단에 라인 배치
              }}></div>
              
              <div style={{
                  width:'956px',
                  color: 'white', 
                  fontSize: '24px', 
                  fontFamily: 'Pretendard', 
                  fontWeight: '700', 
                  lineHeight: '33.60px', 
                  textAlign: 'left' // 중앙 정렬
              }}>
                  프로필 설정
              </div>
          </div>
          
          {/* 섹션2 */}
          <div style={{display:'flex',flexDirection:'column',gap:'14px',paddingBottom:'280px'}}>
              {/* 닉네임을 쓰는 부분 */}
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '13px',
                  width: '277px',
                  height: '28px'
                  }}>
                  <div style={{
                      color: 'white',
                      fontSize: '20px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: '600',
                      lineHeight: '28px'
                  }}>
                      닉네임
                  </div>
                  <div style={{
                      color: '#989DAF',
                      fontSize: '16px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: '400',
                      lineHeight: '22.4px'
                  }}>
                      1자 이상 n자 이내로 입력해주세요
                  </div>
              </div>
              {/* 인풋 부분 */}
              <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  style={{
                      width: '948px',
                      height: '76px',
                      padding: '24px 28px',
                      background: '#1E1F24',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      color: isFocused ? "white" : "#7B8091", // 입력 시 흰색, 기본은 회색
                      fontSize: '18px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: '400',
                      lineHeight: '25.2px',
                      border: 'none',
                      outline: 'none', // 클릭 시 기본 아웃라인 제거
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => setIsFocused(e.target.value !== "")}  
              />
          </div> 
          {/* 섹션3 - 저장하기와 탈퇴하기 버튼이 있는 곳*/}
          <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent: 'space-between', width:'956px',paddingBottom:'30px'}}>
              {/* 회원탈퇴 버튼 */}
              <button
              // TODO 나중에 실제 회원탈퇴 기능과 연결해야 한다. 
                  onClick={() => alert("회원 탈퇴 기능이 실행됩니다.")}
                  style={{
                      width: "88px",
                      height: "36px",
                      padding: "8px 20px 8px 16px",
                      background: "#3A3D46",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "400",
                      fontFamily: "Pretendard, sans-serif",
                      color: "white",
                      fontSize: "14px",
                      textAlign: "center",
                      lineHeight: "19.6px",
                      whiteSpace: "nowrap"
                  }}
                  >
                      회원 탈퇴
              </button>
              {/* 변경 내용 저장하기 버튼 */}
              <button
                  onClick = {handleSubmit}
                  style={{
                      width: '162px',
                      height: '56px',
                      padding: '14px 24px',
                      background: '#5E6CFF',
                      borderRadius: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      color: 'white',
                      fontSize: '20px',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: '600',
                      lineHeight: '28px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      wordWrap: 'break-word'
                  }}
                  >
                  변경 내용 저장
              </button>
          </div>

      </div>
    );
  };
  
  export default Profile;  // export는 컴포넌트 이름과 동일해야 한다.
