import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router'; // useRouter import
import MyPageModal from './Modal/MyPageModal';
import useAuthStore from '@/store/useAuthStore';

const NavUserSection = ({signin}) => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const router = useRouter(); // useRouter 사용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [avatarUrl, setAvatarUrl] = useState(undefined);


  useEffect(() => {
    if (profile?.avatar_url !== undefined) {
      setAvatarUrl(profile.avatar_url || null); // 없으면 null로 명시
    }
  }, [profile]);

  // 모달 토글 함수
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // 모달 상태 변경
  };

  return (
    <div
      style={{
        padding: 4,
        borderRadius: 100,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        display: 'inline-flex',
        position: 'relative',
      }}
    >
      {/* 오른쪽 부분 (버튼 및 아이콘) */}
      <div
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4,
          display: 'inline-flex',
        }}
      >
        {/* 프로필 아이콘 부분 */}
        {/* <img
          src="/profile_img.svg"
          alt="Profile"
          width={32}
          height={32}
          onClick={toggleModal}
        /> */}
          <img
            src={avatarUrl === undefined ? "/profile_basic_img.svg" : (avatarUrl || "/write_icon.svg")}
            alt="Profile"
            width={36}
            height={36}
            onClick={toggleModal}
            style={{
                borderRadius: '50%',
                objectFit: 'cover',
            }}
          />

        {/* 드롭다운 화살표 아이콘 */}
        <div data-svg-wrapper style={{ position: 'relative' }}>
          <img
            src="/dropdown_icon.svg"
            alt="Profile"
            width={24}
            height={24}
            onClick={toggleModal}
            style={{
              transition: 'transform 0.3s ease', // 부드러운 회전 효과
              transform: isModalOpen ? 'rotate(0deg)' : 'rotate(180deg)', // isModalOpen 상태에 따라 회전
            }}
          />
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          style={{
            position: 'absolute', // 드롭다운 아이콘을 기준으로 절대 위치
            top: '60px', // 아이콘 바로 아래에 위치
            right: '0',
            zIndex: 100, // 모달이 다른 요소 위에 올 수 있도록
          }}
        >

          
          <MyPageModal onClose={toggleModal} username = {profile.username} />
        </div>
      )}
    </div>
  );
};

export default NavUserSection;
