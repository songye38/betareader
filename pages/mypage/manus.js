import MyManuItem from "@/components/MyPage/MyManuItem";

const manus = ({ userId, manuscriptId }) => {

  return (
    <div style={{'display':'flex',flexDirection:'column',gap:'40px',justifyContent: 'center',alignItems: 'center'}}>
    <div style={{
        width: '100%', 
        height: 69, 
        position: 'relative', 
        padding: '0 242px', // 텍스트가 적당히 가운데 배치되도록 여백 설정
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}>
        <div style={{
            width: '100%', 
            height: 2, 
            backgroundColor: '#4A4E5B', // 라인 색상 설정
            position: 'absolute', 
            top: '100%' // 하단에 라인 배치
        }}></div>
        
        <div style={{
            width:'956px',
            color: 'white', 
            fontSize: 24, 
            fontFamily: 'Pretendard', 
            fontWeight: '700', 
            lineHeight: '33.60px', 
            textAlign: 'left' // 중앙 정렬
        }}>
            연재물 설정
        </div>
    </div>
    {/* 만약 작성한 글이 없다면 "아직 작성한 연재물이 없어요." 문구 표시해줘야 한다.  */}
    <div style={{display:"flex",flexDirection:'column',gap:'24px'}}>
        <MyManuItem />
        <MyManuItem />
        <MyManuItem />
        <MyManuItem />
    </div>
</div>
  );
};

export default manus;
