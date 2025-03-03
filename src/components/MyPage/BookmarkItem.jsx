import React from 'react';

const BookmarkItem = () => {
  return (
    <div style={{
      width: 956, height: 116, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24, 
      background: '#2C2D34', borderRadius: 20, overflow: 'hidden', border: '1px #4A4E5B solid', 
      justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'
    }}>
      <div style={{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'inline-flex'
      }}>
        <div style={{
          color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '28px', wordWrap: 'break-word'
        }}>
            {/* 원고집 제목이 들어와야 한다.  */}
          악역에게 꽃길을 깔아주려 합니다
        </div>
        <div style={{
          color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '28px', wordWrap: 'break-word'
        }}>
          {/* 에피소드 제목이 들어와야 한다.  */}
          1화 초안
        </div>
      </div>
      <div style={{
        paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 20, background: '#3A3D46', 
        borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex'
      }}>
        <img src="/delete_icon.svg" alt="Profile" width={24} height={24} />
        <div style={{
          textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Pretendard', 
          fontWeight: '400', lineHeight: '19.60px', wordWrap: 'break-word'
        }}>
          삭제
        </div>
      </div>
    </div>
  );
}

export default BookmarkItem;
