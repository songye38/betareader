import React, { useEffect, useState } from 'react';
import UserInfoSection from './UserInfoSection';
import UserGoalSection from './UserGoalSection';




const UserSectionComponent = () => {
  

  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#1E1F24',
        borderRadius: '32px',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        My Section
      </div>



      <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
        <div style={{width:'50%'}}>
            <UserInfoSection />
        </div>
        <div style={{width:'50%'}}>
         <UserGoalSection />
        </div>
      </div>

      


    </div>
  );
};

export default UserSectionComponent;
