'use client';

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const options = ["프롤로그", "에피소드", "에필로그", "직접 입력"];

const DropdownInput = () => {
  const { control, setValue, watch } = useForm();
  const selectedValue = watch("dropdown", "선택하세요");
  const customInputValue = watch("customInput", ""); // 직접 입력 값

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block", width: "18rem" }}>
      {/* 기본 드롭다운 버튼 */}
      <div
        style={{
          display: "flex",
          width: "288px",
          height: "76px",
          padding: "1.5rem 1.25rem",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "1.25rem",
          background: "#1E1F24",
          color: "white",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: "1rem", fontWeight: "500" }}>
          {selectedValue === "직접 입력" ? customInputValue || "직접 입력" : selectedValue}
        </span>
        <img
          src="/arrow_up_icon.svg"
          alt="arrow"
          width="16"
          height="16"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </div>

      {/* 드롭다운 리스트 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          marginTop: "0.5rem",
        //   marginBottom:'11rem',
          background: "#1E1F24",
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        //   maxHeight: isOpen ? "200px" : "0", // max-height로 부드럽게 열고 닫기
          opacity: isOpen ? 1 : 0, // opacity로 부드럽게 나타내기
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out", // 애니메이션 설정
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              padding: "1rem",
              color: "white",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              borderBottom: index !== options.length - 1 ? "1px solid #2A2D34" : "none",
              transition: "background-color 0.3s ease", // hover 시 부드러운 전환 효과 추가
            }}
            onClick={() => {
              if (option === "직접 입력") {
                setValue("dropdown", "직접 입력");
              } else {
                setValue("dropdown", option);
                setValue("customInput", ""); // 다른 옵션 선택 시 입력 초기화
                setIsOpen(false); // 드롭다운 닫기
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#383838"; // hover 시 배경색 변경
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent"; // hover가 끝나면 배경색 원상복구
            }}
          >
            {option}
          </div>
        ))}
        {/* 직접 입력 input 필드 */}
        {selectedValue === "직접 입력" && (
          <Controller
            name="customInput"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                autoFocus
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue("dropdown", "직접 입력"); // 드롭다운 값도 같이 변경
                }}
                style={{
                  width: "100%",
                  padding: "1rem",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                placeholder="내용을 적어주세요...."
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
