import React from 'react';
import RecentEpi from './RecentEpi';

const RecentEpiSet = () => {
  return (
    <div style={{
        width : '95%',
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
      <div style={{display:'flex',flexDirection:'row',gap:'24px'}}>
        <RecentEpi />
        <RecentEpi />
        <RecentEpi />
        <RecentEpi />
      </div>
    

    </div>
    
  );
};

export default RecentEpiSet;
