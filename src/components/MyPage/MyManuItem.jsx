import React from 'react';

const MyManuItem = () => {
  return (
    <div style={{
      width: 956, height: 146, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24,
      background: '#2C2D34', borderRadius: 20, overflow: 'hidden', border: '1px #4A4E5B solid',
      justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'
    }}>
      <div style={{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'inline-flex'
      }}>
        <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
        <div style={{
          color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '28px', wordWrap: 'break-word'
        }}>
          악역에게 꽃길을 깔아주려 합니다
        </div>
        <div style={{
          justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'
        }}>
          <div style={{
            color: '#D9DEEE', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', lineHeight: '22.40px', wordWrap: 'break-word'
          }}>
            2024.01.23. 제작
          </div>
          <div style={{
            width: 2, height: 2, background: '#BFC3D3', borderRadius: 9999
          }} />
          <div style={{
            color: '#D9DEEE', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px', wordWrap: 'break-word'
          }}>
            10개의 원고지
          </div>
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

export default MyManuItem;
