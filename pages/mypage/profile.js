'use client';
import { useState } from "react"; // react에서 useState를 올바르게 불러옵니다.
import { useProfile } from "@/hooks/useProfile";
import supabase from "@/supabase/supabaseClient";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthStore from "@/store/useAuthStore";

const MAX_FILE_SIZE_KB = 500;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Profile = () => { // 컴포넌트 이름 대문자로 수정

  const [nickname, setNickname] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [userId, setUserId] = useState(null);
  const { updateUsername, updateProfileImage } = useProfile(); // ✅ 훅에서 함수 가져오기
  const profile = useAuthStore((state) => state.profile);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);


  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
      console.log("🎯 avatar_url 업데이트됨:", profile.avatar_url);
      console.log("🧪 실제 avatar_url:", avatarUrl);
    } else {
      console.log("⚠️ avatar_url 없음, 현재 profile:", profile);
    }
  }, [profile]);




  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("세션 가져오기 실패:", error);
      } else {
        setUserId(data.session.user.id);
      }
    };
    getSession();
  }, []);

  // 변경 내용 저장 버튼 클릭 시 호출될 함수
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!userId) {
      alert("사용자 정보를 불러오지 못했습니다.");
      return;
    }

    try {
      await updateUsername(userId, nickname);
      // udpateprofile
      toast.success("닉네임이 성공적으로 저장되었습니다.");
    } catch (err) {
      toast.success("닉네임 저장 중 오류가 발생했습니다.");
    }
  };

  // 이미지 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeKB = file.size / 1024;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("jpeg, png, webp 형식의 이미지 파일만 업로드할 수 있어요.");
      return;
    }

    if (fileSizeKB > MAX_FILE_SIZE_KB) {
      alert(`이미지 크기는 최대 ${MAX_FILE_SIZE_KB}KB까지 업로드할 수 있어요.`);
      return;
    }

    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file)); // 로컬 미리보기
  };

  // 이미지 업로드 + 저장 로직
  const handleImageUpload = async () => {
    if (!avatarFile || !userId) return;

    const url = await updateProfileImage(userId, avatarFile);

    if (url) {
      toast.success("프로필 이미지가 저장되었습니다.");
    } else {
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };















  if (!profile) {
    return <div style={{ color: 'white' }}>로딩 중...</div>; // 혹은 Skeleton UI로 교체
  }

  return (
    <div style={{ 'display': 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
          width: '956px',
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




      {/* 프로필 이미지 업로드 섹션 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        {/* 미리보기 */}
        <img
          src={avatarUrl || '/default-avatar.png'} // 기본 이미지 경로 설정 가능
          alt="프로필 이미지"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #4A4E5B'
          }}
        />

        {/* 파일 선택 버튼 */}
        <label
          style={{
            backgroundColor: '#3A3D46',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'Pretendard',
          }}
        >
          이미지 선택
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>

        {/* 업로드 버튼 */}
        {avatarFile && (
          <button
            onClick={handleImageUpload}
            style={{
              backgroundColor: '#A78EF7',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            이미지 저장
          </button>
        )}
      </div>



      {/* 섹션2 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '280px' }}>
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
          value={nickname} // ✅ value 바인딩
          placeholder={profile.username}
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
          onChange={(e) => setNickname(e.target.value)} // ✅ 상태 업데이트
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
        />
      </div>
      {/* 섹션3 - 저장하기와 탈퇴하기 버튼이 있는 곳*/}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '956px', paddingBottom: '30px' }}>
        {/* 회원탈퇴 버튼 */}
        <button
          // TODO [SCRUM-30] 나중에 실제 회원탈퇴 기능과 연결해야 한다. 
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
          onClick={handleSubmit}
          style={{
            width: '162px',
            height: '56px',
            padding: '14px 24px',
            background: '#A78EF7',
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
