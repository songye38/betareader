import AddManuBtn from "../Buttons/AddManuBtn";
import ManuItem from "./ManuItem";
import AddManuItem from "./AddManuItem";

const AllManuSet = ({userId,manuscriptId}) => {
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
                <AddManuBtn userId={userId} manuscriptId={manuscriptId}/>
            </div>
            {/* 있다면 있는만큼 표시해주기  */}
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
                <ManuItem />
            </div>
            {/* 아이템이 하나도 없다면 아래것을 렌더링 해주기 */}
            {/* WARNING 여기 부분에도 props를 넣어주어야 한다. 안넣어주기 때문에 undefined undefined로 나온다! */}
            <AddManuItem />

        </div>
    );
  };
  
  export default AllManuSet;
  