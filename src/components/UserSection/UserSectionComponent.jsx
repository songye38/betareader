import React from 'react';
import UserInfoSection from './UserInfoSection';
import UserGoalSection from './UserGoalSection';
import './UserSectionComponent.css'; // << css 파일 임포트

const UserSectionComponent = () => {
  return (
    <div className="user-section-container">
      <div className="user-section-title">
        My BetaSpace
      </div>
      <div className="user-section-content">
        <div className="user-section-half">
          <UserInfoSection />
        </div>
        <div className="user-section-half">
          <UserGoalSection />
        </div>
      </div>
    </div>
  );
};

export default UserSectionComponent;
