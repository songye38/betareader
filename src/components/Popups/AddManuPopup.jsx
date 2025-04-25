
'use client';
import { useState } from "react";



import AddManuBtn from "../Buttons/AddManuBtn";

const AddManuPopup = () => {

  const [isVisible, setIsVisible] = useState(true); // 팝업의 보임 여부 상태

  const closePopup = () => {
    setIsVisible(false); // 팝업을 숨김
  };

  if (!isVisible) {
    return null; // isVisible이 false일 때는 아무것도 렌더링하지 않음
  }

  return (
    <div style={{ width: 446, height: 234, padding: 36, background: '#2C2D34', borderRadius: 24, border: '1px #4A4E5B solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 32, display: 'inline-flex' }}>
      <div style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
        <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
          <div style={{ color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '28px', wordWrap: 'break-word' }}>
            원고지를 작성하려면<br />연재물이 필요해요
          </div>
          <div style={{ textAlign: 'center', color: '#BFC3D3', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px', wordWrap: 'break-word' }}>
            새로운 연재물을 만들어주세요
          </div>
        </div>
        <img src="/close_icon.svg" alt="Profile" width={24} height={24} onClick={closePopup} style={{ cursor: 'pointer' }} />
      </div>
      <AddManuBtn />
    </div>
  );
};

export default AddManuPopup;
