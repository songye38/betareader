'use client';

import React, { useState } from 'react';
import SetGoalModal from './SetGoalModal'; // 모달 분리된 파일로 import

const UserGoalSection = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '24px 20px',
        borderRadius: '16px',
        backgroundColor: '#1C1C1E',
        fontFamily: 'Pretendard',
        color: '#F5F5F7',
        border: '1px solid #2A2A2C',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 600 }}>
        ✍️ 나의 글쓰기 목표
      </div>

      {selectedGoals.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {selectedGoals.map((goal, index) => (
            <div
              key={index}
              style={{
                display: 'inline-block',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: '#2A2A2C',
                color: '#D4D4D8',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                border: '1px solid #444',
              }}
            >
              {goal}
            </div>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            backgroundColor: '#A78BFA',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            width: 'fit-content',
          }}
        >
          ✨ 목표 설정하기
        </button>
      )}

      {isModalOpen && (
        <SetGoalModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={(goals) => {
            setSelectedGoals(goals);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserGoalSection;
