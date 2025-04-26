
import React from 'react';
import AddManuBtn from '../Buttons/AddManuBtn';

const AddManuItem = () => {
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
        <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
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
            아직 원고집이 없어요.<br />새로운 원고집을 제작해보세요.
          </div>
        </div>
      </div>
      <AddManuBtn />
    </div>
  );
};

export default AddManuItem;
