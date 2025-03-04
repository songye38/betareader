const ManuItem = () => {
    return (
      <div
        style={{
          width: 1096,
          height: 76,
          paddingLeft: 28,
          paddingRight: 28,
          paddingTop: 24,
          paddingBottom: 24,
          background: "#2C2D34",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #4A4E5B",
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
          cursor : 'pointer',
        }}
      >
        <div style={{display:'flex',flexDirection:'row',width:'85%'}}>
          <div
            style={{
              width:'80%',
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
              display: "flex",
            }}
          >
            <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
            <div
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Pretendard',
                fontWeight: '600',
                lineHeight: '28px',
                wordWrap: 'break-word',
                whiteSpace: 'nowrap',      // 한 줄로 유지
                overflow: 'hidden',        // 넘치는 텍스트 숨김
                textOverflow: 'ellipsis',  // 넘칠 경우 말줄임표(...) 적용
                // maxWidth: '200px'          // 최대 너비 설정 (원하는 크기로 조정)
              }}
            >
              {/* 제목이 들어온다.  */}
              악역에게 꽃길을 깔아주려 합니다. 길이가 매우 길어지면 어떨까요? 궁금합니다.하하하하하하하하하하하하하하하하하
            </div>
          </div>
          <div
            style={{
              width:'20%',
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 8,
              display: "flex",
            }}
          >
            <div
              style={{
                width:'auto',
                color: "#D9DEEE",
                fontSize: 16,
                fontFamily: "Pretendard",
                fontWeight: "500",
                lineHeight: "22.40px",
                wordWrap: "break-word",
              }}
            >
              {/* 해당 원고집 안에 있는 총 원고의 개수   */}
              10개의 원고지
            </div>
            <div
              style={{
                width: 2,
                height: 2,
                background: "#BFC3D3",
                borderRadius: 9999,
              }}
            />
            <div
              style={{
                width:'auto',
                color: "#8A94FF",
                fontSize: 16,
                fontFamily: "Pretendard",
                fontWeight: "700",
                lineHeight: "22.40px",
                wordWrap: "break-word",
              }}
            >
              {/* 작성 시점에 관한 것 아마 보이기도 하고 안보이기도 하고  */}
              최근 작성
            </div>
          </div>
          </div>
      </div>
    );
  };
  
  export default ManuItem;
  