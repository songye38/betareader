'use client';
import { useState } from "react";
import StartWritingBtn from "../Buttons/StartWritingBtn";

const AddIdeaPopup = ({ onClose }) => {
  const [title, setTitle] = useState(""); // 제목 입력값 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 드롭다운 선택값 상태
  const categories = ["소설", "에세이", "시", "SF", "판타지"]; // 드롭다운 옵션 목록

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
          아이디어 추가
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

            {/* 📌 드롭다운 추가 부분 */}
            <div
        style={{
          width: "100%",
        //   padding: "16px 28px",
        //   background: "#1E1F24",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: "100%",
            height: "48px",
            padding: "8px",
            color: "white",
            fontSize: "18px",
            fontFamily: "Pretendard",
            fontWeight: "400",
            background: "#2C2D34",
            // border: "1px solid #4A4E5B",
            borderRadius: "10px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>카테고리를 선택해주세요</option>
          {categories.map((category, index) => (
            <option key={index} value={category} style={{ background: "#1E1F24" }}>
              {category}
            </option>
          ))}
        </select>
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
        {/* 제목 입력 */}
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
      <StartWritingBtn manuTitle={"아이디어 추가하기"} category={selectedCategory} />
    </div>
  );
};

export default AddIdeaPopup;
