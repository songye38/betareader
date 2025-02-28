import AddManuBtn from "../Buttons/AddManuBtn";
import ManuItem from "./ManuItem";

const AllManuSet = () => {
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div
                style={{
                width: 1096,
                height: 40,
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
                }}
            >
                <div
                style={{
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Pretendard",
                    fontWeight: "700",
                    lineHeight: "33.60px",
                    wordWrap: "break-word",
                }}
                >
                모든 원고집
                </div>
                <AddManuBtn />
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
            </div>

        </div>
    );
  };
  
  export default AllManuSet;
  