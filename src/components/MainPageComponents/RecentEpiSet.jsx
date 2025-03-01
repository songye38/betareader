import React from 'react';
import RecentEpiItem from './RecentEpiItem';
import AddEpiItem from './AddEpiItem';

const RecentEpiSet = () => {
  return (
    <div style={{
        width : '1152px',
        display:'flex',
        flexDirection:'column',
        gap:'24px',
        padding:'24px',
        backgroundColor:'#1E1F24',
        borderRadius:'32px',
    }}>
        <div 
            style={{
                color: 'white', 
                fontSize: 24, 
                fontFamily: 'Pretendard', 
                fontWeight: '700', 
                lineHeight: '33.60px', 
                wordWrap: 'break-word'
            }}
            >
      최근 작성한 원고
      </div>
      {/* 아이템이 있으면 표시하고 없으면 문구를 표시한다. -> 이건 나중에 백엔드랑 연결 */}
      <div style={{display:'flex',flexDirection:'row',gap:'24px'}}>
        <RecentEpiItem />
        <RecentEpiItem />
        <RecentEpiItem />
        <RecentEpiItem />
      </div>


      {/* 추가하는 버튼은 없앤다. */}
      {/* <AddEpiItem /> */}
    

    </div>
    
  );
};

export default RecentEpiSet;
