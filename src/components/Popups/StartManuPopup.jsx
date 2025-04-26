'use client';
import { useState } from "react";
import StartWritingBtn from "../Buttons/StartWritingBtn";

const StartManuPopup = ({ onClose }) => {
  const [title, setTitle] = useState(""); // 제목 입력값 상태

  return (
    <div
      style={{
        width: 446,
        height: "auto",
        padding: 36,
        background: "#2C2D34",
        borderRadius: 24,
        border: "1px #4A4E5B solid",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        display: "inline-flex",
      }}
    >
      {/* 제목 및 닫기 버튼 */}
      <div
        style={{
          alignSelf: "stretch",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Pretendard",
            fontWeight: "600",
            lineHeight: "28px",
            wordWrap: "break-word",
          }}
        >
          원고집의 제목을 적어주세요
        </div>

        <img
          src="/close_icon.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* 제목 입력 필드 */}
      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "24px 28px",
          background: "#1E1F24",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "Pretendard",
              fontWeight: "700",
              lineHeight: "33.6px",
            }}
          >
            제목
          </div>
          <div
            style={{
              color: "#8A94FF",
              fontSize: 24,
              fontFamily: "Pretendard",
              fontWeight: "700",
              lineHeight: "33.6px",
              marginLeft: 4,
            }}
          >
            *
          </div>
        </div>

        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: "10px",
            color: "white",
            fontSize: "20px",
            fontFamily: "Pretendard",
            fontWeight: "400",
            lineHeight: "28px",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* 버튼 추가 */}
      <StartWritingBtn manuTitle={title} />
    </div>
  );
};

export default StartManuPopup;
