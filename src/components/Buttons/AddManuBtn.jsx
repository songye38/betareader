const AddManuBtn = () => {
    return (
      <div
        style={{
          width: 177,
          height: 52,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 12,
          paddingBottom: 12,
          background: "#5E6CFF",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          display: "inline-flex",
          cursor: "pointer", // 클릭 가능하도록 설정
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
          원고집 만들기
        </div>
      </div>
    );
  };
  
  export default AddManuBtn;
  