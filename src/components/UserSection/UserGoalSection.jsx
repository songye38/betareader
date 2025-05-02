'use client';

import React, { useEffect, useState } from 'react';
import SetGoalModal from './SetGoalModal';
import { useProfile } from '@/hooks/useProfile';
import supabase from '@/supabase/supabaseClient';

const UserGoalSection = () => {
  const [session, setSession] = useState(null);
  const { fetchGoals, updateGoals, loading, error } = useProfile();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 세션 불러오기
  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data, error } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error('세션 가져오기 실패:', error);
  //     } else {
  //       setSession(data?.session);
  //     }
  //   };
  //   getSession();
  // }, []);
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
  
        if (error) {
          console.error('❌ 세션 가져오기 실패:', error.message);
          return;
        }
  
        if (!session) {
          console.warn('⚠️ 세션이 없습니다.');
          return;
        }
  
        setSession(session);
      } catch (err) {
        console.error('❌ getSession 실행 중 에러 발생:', err);
      }
    };
  
    getSession();
  }, []);
  

  const userId = session?.user?.id;

  // ✅ goals 가져오기
  useEffect(() => {
    if (userId) {
      fetchGoals(userId).then((fetchedGoals) => {
        if (fetchedGoals) {
          setSelectedGoals(fetchedGoals);
        }
      });
    }
  }, [userId]);

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '24px 20px',
        borderRadius: '16px',
        // backgroundColor: '#1C1C1E',
        background: '#2C2D34',
        fontFamily: 'Pretendard',
        color: '#F5F5F7',
        border: '1px #4A4E5B solid',
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 600 }}>
        ✍️ 나의 글쓰기 목표
      </div>

      {selectedGoals.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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

          {/* ✏️ 수정하기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: '#3B3B3D',
              color: '#F5F5F7',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #555',
              alignSelf: 'flex-start',
              marginTop: '8px',
              fontSize: '14px',
            }}
          >
            ✏️ 수정하기
          </button>
        </div>
      ) : (
        // 목표 없을 때
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

      {/* 목표 설정/수정 모달 */}
      {isModalOpen && (
        <SetGoalModal
          initialGoals={selectedGoals}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(goals) => {
            setSelectedGoals(goals);
            if (userId) {
              updateGoals(userId, goals);
              console.log("업데이트 완료!!!!!!!!!!!!!!!!!!!!!!!!");
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserGoalSection;
