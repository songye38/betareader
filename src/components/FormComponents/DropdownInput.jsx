'use client';

import { useState } from 'react';

const options = ["프롤로그", "에피소드", "에필로그", "직접 입력"];

const DropdownInput = ({ error, onDropdownChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('선택하세요');
  const [customInputValue, setCustomInputValue] = useState('');

  // 드롭다운 값이 변경될 때 상위 컴포넌트에 선택된 값을 전달하는 함수
  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    if (option !== "직접 입력") {
      setCustomInputValue(''); // "직접 입력"이 아닐 경우 커스텀 입력값 초기화
    }
    onDropdownChange(option); // 상위 컴포넌트에 선택된 값 전달
    if (option !== "직접 입력") {
      setIsOpen(false); // "직접 입력"이 아닌 경우에만 드롭다운을 닫음
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomInputValue(e.target.value); // 커스텀 입력 값 업데이트
    setSelectedValue(e.target.value); // 입력한 값을 바로 드롭다운 버튼에 표시
    onDropdownChange("직접 입력"); // 드롭다운 값도 '직접 입력'으로 설정
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsOpen(false); // 엔터 키를 누르면 드롭다운을 닫음
    }
  };

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
          {options.map((option, index) => {
            // "직접 입력"일 경우, 바로 입력 필드로 변경
            if (option === "직접 입력") {
              return (
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
                >
                  <input
                    type="text"
                    value={customInputValue}
                    onChange={handleCustomInputChange}
                    onKeyDown={handleKeyPress} // 엔터 키를 감지하는 이벤트 핸들러 추가
                    placeholder="직접 입력"
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
                  />
                </div>
              );
            }
            return (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  borderBottom: index !== options.length - 1 ? "1px solid #2A2D34" : "none",
                  transition: "background-color 0.3s", // 배경색 변경 애니메이션
                }}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#3A407A"} // hover 시 배경색 변경
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"} // hover 종료 시 배경색 복원
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
