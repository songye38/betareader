import React from 'react';
import { useRouter } from 'next/router'; // useRouter import

const MyPageModal = ({onClose}) => {
    const router = useRouter(); // useRouter 훅 사용
    const handleNavigation = (path) => {
        router.push(path); // 경로 이동
        onClose(); // 모달 닫기
    };
  return (
    <div 
      style={{
        width: 345,
        height: 'auto',
        padding: 32,
        background: '#2C2D34',
        borderRadius: 24,
        border: '1px #606575 solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 12,
        display: 'inline-flex'
      }}
    >
    <div style={{  width : '100%',display:'flex',flexDirection:'row',alignItems: 'flex-end',justifyContent: 'space-between',paddingBottom:'20px' ,borderBottom:'1.2px solid #636466'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <img src="/profile_img.svg" alt="Profile" width={48} height={48} />
            <div style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 20,
                fontFamily: 'Pretendard',
                fontWeight: '600',
                lineHeight: '28px',
                wordWrap: 'break-word'
                }}>
                    {/* 나중에 사용자 닉네임이 와야함 */}
                betareader_12456 
                </div>
        </div>
        <div style={{
            display: 'inline-flex',          // flexbox로 변경
            alignItems: 'center',           // 수직 중앙 정렬
            justifyContent: 'center',       // 수평 중앙 정렬
            padding: '6px',                 // 아이콘과 border 사이의 간격
            border: '1px solid #636466',    // border 설정 (원하는 색상, 두께로 조정 가능)
            borderRadius: '12px',           // 둥근 테두리 (원 모양으로 만들기 위한 설정)
            boxSizing: 'border-box'         // border가 이미지 크기에 영향을 미치지 않도록 설정
        }}>
            <img src="/write_icon.svg" alt="Profile" width={24} height={24} />
        </div>



      </div>

      {/* Menu Items */}
      {/* 연재물 설정 */}
      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        <div 
            onClick={() => handleNavigation('/mypage/manus')}
            style={{
            alignSelf: 'stretch',
            paddingLeft: 13,
            paddingRight: 13,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex'
            }}
        >
            <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
            <div 
            style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Pretendard',
                fontWeight: '500',
                lineHeight: '22.40px',
                wordWrap: 'break-word'
            }}
            >
            연재물 설정
            </div>
        </div>


        {/* 북마크 */}
        <div 
            onClick={() => handleNavigation('/mypage/bookmarks')}
            style={{
            alignSelf: 'stretch',
            paddingLeft: 13,
            paddingRight: 13,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex'
            }}
        >
            <img src="/bookmark_default.svg" alt="Profile" width={24} height={24} />
            <div 
            style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Pretendard',
                fontWeight: '500',
                lineHeight: '22.40px',
                wordWrap: 'break-word'
            }}
            >
            북마크
            </div>
        </div>
        {/* 로그아웃 */}
        <div 
            style={{
            alignSelf: 'stretch',
            paddingLeft: 13,
            paddingRight: 13,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex'
            }}
        >
            <img src="/logout_icon.svg" alt="Profile" width={24} height={24} />
            <div 
            style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Pretendard',
                fontWeight: '500',
                lineHeight: '22.40px',
                wordWrap: 'break-word'
            }}
            >
            로그아웃
            </div>
        </div>
    </div>
    </div>
    
  );
};

export default MyPageModal;
