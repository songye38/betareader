const AddEpiBtn = () => {
    return (
      <div 
        style={{
          width: '100%', 
          height: 162, 
          paddingLeft: 28, 
          paddingRight: 28, 
          paddingTop: 24, 
          paddingBottom: 24, 
          background: '#6071FB', 
          borderRadius: 20, 
          overflow: 'hidden', 
          border: '1px #4A4E5B solid', 
          flexDirection: 'column', 
          alignItems: 'center', 
          display: 'flex',
          cursor : 'pointer',
          justifyContent: 'center',
        }}
      >
        <img src="/plus_icon.svg" alt="Profile" width={24} height={24} />
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
          원고 추가하기
        </div>
      </div>
    );
  };
  
  export default AddEpiBtn;