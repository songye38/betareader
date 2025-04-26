'use client';
import { toast } from "react-toastify";


const CopyFeedbackLink = ({ linkUrl, onClose }) => {

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      toast.success("링크가 복사되었습니다!"); // 성공적으로 복사되었음을 사용자에게 알림


    } catch (err) {
      toast.error("링크 복사에 실패했습니다."); // 복사 실패 시 사용자에게 알림

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
            피드백 링크
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
        <div
          style={{
            color: "white",
            fontSize: 15,
            fontFamily: "Pretendard",
            fontWeight: "400",
            lineHeight: "auto",
            wordWrap: "break-word",
          }}
        >
          링크를 복사해 주변 사람들의 솔직한 피드백을 받아보세요.
        </div>

        {/* 제목 입력 필드 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "20px 20px",
            background: "#1E1F24",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            whiteSpace: "nowrap", // 한 줄로 표시되도록 설정
            overflow: "scroll",   // 텍스트가 넘칠 경우 숨기기
            textOverflow: "ellipsis", // 넘칠 경우 '...'으로 표시
          }}
        >
          <div
            style={{
              width: "100%",
              height: 'auto',
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
          {linkUrl}
        </div>

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
            링크 복사하기
          </div>
        </div>
      </div>

    </div>

  );
};

export default CopyFeedbackLink;
