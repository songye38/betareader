import React from 'react';

const Navbar = () => {
  return (
    <div style={{ width: 1440, height: 60, paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', gap: 1162, display: 'inline-flex' }}>
      {/* 왼쪽 부분 (로고 및 텍스트) */}
      <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex' }}>
        <div data-svg-wrapper style={{ position: 'relative' }}>
            {/* 로고가 들어가야 함 -> 나중에 대체하기  */}
          <svg width="39" height="35" viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="39" height="35" fill="#5E6CFF" />
          </svg>
        </div>

        {/* 제목 */}
        <div style={{ color: 'white', fontSize: 22, fontFamily: 'Inconsolata', fontWeight: '400', lineHeight: '30.80px', wordWrap: 'break-word' }}>
          BetaReader
        </div>
      </div>

      {/* 오른쪽 부분 (버튼 및 아이콘) */}
      <div style={{ padding: 4, borderRadius: 100, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
          {/* 프로필 아이콘 부분 */}
          <img src="/profile_img.svg" alt="Profile" width={32} height={32} />


          {/* 드롭다운 화살표 아이콘 */}
          <div data-svg-wrapper style={{ position: 'relative' }}>
          <img src="/dropdown_icon.svg" alt="Profile" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
