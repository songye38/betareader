'use client';
import { useState } from "react";
import useManuscripts from "@/hooks/useManuscripts";
import { toast } from "react-toastify";

const EditManuTitlePopup = ({onClose,title,manuscriptId}) => {
  const [titleInput, setTitleInput] = useState(title || "");
  const { updateTitle, loading } = useManuscripts();

  const handleClick = async () => {
    if (!titleInput.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    const result = await updateTitle(manuscriptId, titleInput);
    if (result) {
      toast.success("제목이 성공적으로 업데이트되었습니다.");
      onClose(); // 성공 시 팝업 닫기
    } else {
      toast.error("제목 수정에 실패했습니다.");
    }
  };




  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)", // 딤처리 (선택)
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
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
          원고집 제목 수정
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
          placeholder={titleInput}
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
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
      <div
      onClick={handleClick}
      style={{
        width: 'auto',
        height: 52,
        padding: '12px 20px',
        background: '#A78EF7',
        borderRadius: 16,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '28px',
        }}
      >
        원고집 제목 수정하기
      </div>
    </div>
    </div>

    </div>
    
  );
};

export default EditManuTitlePopup;
