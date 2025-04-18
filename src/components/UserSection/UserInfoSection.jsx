'use client';

import React from 'react';
import useAuthStore from '@/store/useAuthStore';

const UserInfoSection = () => {
  const { profile } = useAuthStore();

  // profile이 없을 때는 null 반환하거나 로딩 처리
  if (!profile) {
    return null; // 또는 <div>로딩 중...</div>
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '24px 20px',
        borderRadius: '16px',
        // backgroundColor: '#1C1C1E',
        background: '#2C2D34', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        fontFamily: 'Pretendard',
        border: '1px #4A4E5B solid', 
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        color: '#f5f5f7',
      }}
    >
      {/* 유저 인사말 */}
      <div style={{ fontSize: '20px', fontWeight: 600 }}>
        안녕하세요, <span style={{ color: '#A78BFA' }}>{profile.username}님</span>
      </div>

      {/* 멤버십 뱃지 */}
      <div
        style={{
          fontSize: '13px',
          backgroundColor: '#A78BFA',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: '24px',
          fontWeight: 500,
        }}
      >
        PRO 멤버십
      </div>

      {/* 마이페이지 버튼 */}
      <button
        style={{
          fontSize: '14px',
          color: '#A1A1AA',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontWeight: 500,
          textDecoration: 'underline',
          transition: 'color 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#A78BFA')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#A1A1AA')}
      >
        마이페이지 바로가기 →
      </button>
    </div>
  );
};

export default UserInfoSection;
