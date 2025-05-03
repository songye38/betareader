import React from 'react';
import UserInfoSection from './UserInfoSection';
import UserGoalSection from './UserGoalSection';
import styles from './UserSectionComponent.module.css'; // CSS 모듈 import

const UserSectionComponent = () => {
  return (
    <div className={styles.userSectionContainer}>
      <div className={styles.userSectionTitle}>
        My BetaSpace
      </div>
      <div className={styles.userSectionContent}>
        <div className={styles.userSectionHalf}>
          <UserInfoSection />
        </div>
        <div className={styles.userSectionHalf}>
          <UserGoalSection />
        </div>
      </div>
    </div>
  );
};

export default UserSectionComponent;
