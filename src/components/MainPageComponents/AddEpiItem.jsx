
import React from 'react';
import AddEpiBtn from '../Buttons/AddEpiBtn';


const AddEpiItem = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 24,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              display: "inline-flex",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#BFC3D3",
                fontSize: 20,
                fontFamily: "Pretendard",
                fontWeight: "500",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >
              아직 제작한 원고지가 없어요.
            </div>
          </div>
        </div>
        <AddEpiBtn />
      </div>
    );
  };
  
  export default AddEpiItem;
  