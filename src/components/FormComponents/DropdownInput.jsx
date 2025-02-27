'use client';

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const options = ["프롤로그", "에피소드", "에필로그", "직접 입력"];

const DropdownInput = () => {
  const { control, setValue, watch } = useForm();
  const selectedValue = watch("dropdown", "선택하세요"); // 기본값 설정
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block", width: "18rem" }}>
      {/* 기본 드롭다운 버튼 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "4.75rem",
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
        <span style={{ fontSize: "1rem", fontWeight: "500" }}>{selectedValue}</span>
        <img src="/arrow_icon.svg" alt="arrow" width="16" height="16" />
      </div>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            marginTop: "0.5rem",
            background: "#1E1F24",
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
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
              }}
              onClick={() => {
                setValue("dropdown", option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* 직접 입력 선택 시 input 필드 표시 */}
      {selectedValue === "직접 입력" && (
        <Controller
          name="customInput"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              style={{
                marginTop: "0.5rem",
                width: "100%",
                padding: "1rem",
                background: "#1E1F24",
                color: "white",
                borderRadius: "1rem",
                border: "1px solid #2A2D34",
                fontSize: "1rem",
                outline: "none",
              }}
              placeholder="내용을 입력하세요..."
            />
          )}
        />
      )}
    </div>
  );
};

export default DropdownInput;
