import { useRouter } from "next/router";
import useAuthStore from "@/store/useAuthStore";
import supabase from "@/supabase/supabaseClient";
import { useState } from "react";

const AddManuBtn = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);  // useAuthStore에서 user 정보 가져오기
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      console.error('로그인된 유저가 없습니다.');
      return;
    }

    setLoading(true);

    try {
      // 1. manuscript 테이블에 새로운 원고집 추가
      const { data, error } = await supabase
        .from('manuscript')
        .insert([
          { user_id: user.id, title: '새 원고집' },  // 예시로 title만 넣어줌
        ])
        .select('id, user_id, title') // 삽입 후 반환할 컬럼을 지정
        .single(); // 삽입된 데이터가 하나일 경우 단일 값으로 반환

      if (error) {
        console.error("삽입 오류:", error);
        return;
      }

      console.log("삽입된 데이터:", data);  // 삽입된 데이터를 확인

      // 2. 새로운 원고집 페이지로 이동
      const manuscriptId = data.id; // 자동 생성된 manuscriptId 사용
      router.push(`/${user.id}/${manuscriptId}`); // 해당 경로로 이동

    } catch (error) {
      console.error('원고집 생성 실패:', error);
      // 에러 처리 (예: 사용자에게 메시지 표시)
    }

    setLoading(false);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 'auto',
        height: 52,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        background: '#5E6CFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        display: 'inline-flex',
        cursor: 'pointer',
      }}
    >
      <img src="/folder_icon.svg" alt="Profile" width={24} height={24} />
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '28px',
          wordWrap: 'break-word',
        }}
      >
        새 연재물 만들기
      </div>
    </div>
  );
};

export default AddManuBtn;
