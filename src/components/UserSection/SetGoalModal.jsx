'use client';

import React, { useEffect, useState } from 'react';

const goals = [
  '문장 표현력 강화하기',
  '어휘력 확장 및 반복 단어 줄이기',
  '캐릭터별 고유한 말투와 어조 정하기',
  '강렬한 도입부 만들기',
  '플롯을 일관되게 구성하기',
  '대사와 서술의 균형 맞추기',
  '설정 자료 조사 및 고증 철저히 하기',
  '복선 활용 능력 키우기',
  '긴장감 있는 서술 방식 익히기',
  '장면 전환을 자연스럽게 하기',
  '전개 속도 조절하기',
  '결말까지 탄탄한 이야기 만들기',
  '반복되는 패턴에서 벗어나기',
  '독자와의 소통을 통한 글 개선하기',
  '자신만의 문체와 스타일 찾기',
];

const SetGoalModal = ({ initialGoals = [], onClose, onConfirm }) => {
  const [selected, setSelected] = useState([]);

  // ✅ 모달 열릴 때 초기 목표 설정
  useEffect(() => {
    setSelected(initialGoals);
  }, [initialGoals]);

  const toggleGoal = (goal) => {
    const isSelected = selected.includes(goal);

    if (isSelected) {
      setSelected(selected.filter((g) => g !== goal));
    } else {
      if (selected.length >= 3) {
        alert('최대 3개까지만 선택할 수 있어요!');
        return;
      }
      setSelected([...selected, goal]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#1C1C1E',
          padding: '24px 20px',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '720px',
          color: '#F5F5F7',
          fontFamily: 'Pretendard',
          border: '1px solid #2A2A2C',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          ✍️ 글쓰기 목표 선택 (최대 3개)
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {goals.map((goal, index) => {
            const isSelected = selected.includes(goal);
            return (
              <div
                key={index}
                onClick={() => toggleGoal(goal)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? '#3B3B40' : '#2A2A2C',
                  color: '#D4D4D8',
                  fontSize: '14px',
                  border: isSelected
                    ? '1px solid #A78BFA'
                    : '1px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {goal}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: '#2A2A2C',
              color: '#F5F5F7',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
          <button
            onClick={() => onConfirm(selected)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: '#A78BFA',
              color: '#1C1C1E',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetGoalModal;
