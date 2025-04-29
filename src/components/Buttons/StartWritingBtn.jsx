import { useRouter } from "next/router";
import useAuthStore from "@/store/useAuthStore";
import supabase from "@/supabase/supabaseClient";
import { useState } from "react";
import useManuscriptStore from "@/store/useManuscriptStore";

const StartWritingBtn = ({ manuTitle }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const setManuscript = useManuscriptStore((state) => state.setManuscript);

  const handleClick = async () => {
    if (!user) {
      console.error('로그인된 유저가 없습니다.');
      return;
    }

    setLoading(true);

    try {
      // 1. manuscript 테이블에 새 원고 추가
      const { data, error } = await supabase
        .from('manuscript')
        .insert([{ user_id: user.id, title: manuTitle }])
        .select('id, user_id, title')
        .single();

      if (error) throw new Error(`manuscript 삽입 오류: ${error.message}`);


      // 3. zustand 상태 업데이트
      setManuscript({ id: data.id });

      // 4. 원고 페이지로 이동
      router.push(`/manu/${data.id}`);
    } catch (err) {
      console.error("❌ 원고집 생성 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 'auto',
        height: 52,
        padding: '12px 20px',
        background: '#A78EF7',
        borderRadius: 16,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        opacity: loading ? 0.7 : 1, // 로딩 중일 때 투명도 조정
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
        }}
      >
        {loading ? "연재 준비 중..." : "연재 시작하기"}
      </div>
    </div>
  );
};

export default StartWritingBtn;
