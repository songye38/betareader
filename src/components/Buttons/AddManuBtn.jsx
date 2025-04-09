import { useState } from "react";
import StartManuPopup from "../Popups/StartManuPopup";

const AddManuBtn = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          width: "auto",
          height: 52,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
          background: "#A78EF7",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          display: "inline-flex",
          cursor: "pointer",
        }}
      >
        <img src="/folder_icon.svg" alt="Profile" width={24} height={24} />
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 20,
            fontFamily: "Pretendard",
            fontWeight: "600",
            lineHeight: "28px",
            wordWrap: "break-word",
          }}
        >
          새 연재물 만들기
        </div>
      </div>

      {/* StartManuPopup이 화면 중앙에 위치하도록 설정 */}
      {isPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // 어두운 배경
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000, // 최상위로 설정
          }}
          onClick={() => setIsPopupVisible(false)} // 클릭 시 닫힘
        >
          <div onClick={(e) => e.stopPropagation()}>
            <StartManuPopup onClose={() => setIsPopupVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddManuBtn;
