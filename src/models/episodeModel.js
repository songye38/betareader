import supabase from '@/supabase/supabaseClient';

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .insert(
          {
            tab_no: requestData.tabNo,
            manuscript_id: requestData.manuscriptId,
            title: requestData.title,
            tab_id: requestData.tabId,
            content: requestData.content,
            type: requestData.type,
          },
      )
    .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("데이터베이스 저장 성공", data);
    return data;
  } catch (error) {
    console.error("❌ 에피소드 저장 실패:", error);
    throw error;
  }
};

export const getRecentEpisodes = async (userId) => {
    try {
      // episode 테이블과 manuscript 테이블을 join하여 데이터를 가져옴
      const { data, error } = await supabase
        .from('episode')
        .select(`
          *,
          manuscript (
          id,
            user_id
          )
        `)  // episode 테이블의 모든 칼럼과 manuscript 테이블의 user_id를 선택
        .eq('manuscript.user_id', userId)  // manuscript 테이블의 user_id가 매개변수 userId와 일치하는 에피소드만 필터링
        .order('last_edited_at', { ascending: false })  // 최신순으로 정렬
        .limit(5);  // 최대 5개만 가져오기
  
      if (error) {
        console.error("❌ Supabase 에러:", error.message);
        throw error;
      }
  
      console.log("episode model 가장 최근 수정된 에피소드들:", data);
      return data;  // 데이터 반환
    } catch (error) {
      console.error("❌ 에피소드 불러오기 실패:", error);
      throw error;
    }
  };

  export const getEpisodesByManuId = async (userId, manuscriptId) => {
    try {
      const { data, error } = await supabase
        .from('episode')
        .select(`
          *,
          manuscript (
            id,
            user_id
          )
        `)
        .eq('manuscript.user_id', userId)  // 특정 userId의 원고만 가져옴
        .eq('manuscript.id', manuscriptId) // 특정 manuscript_id의 에피소드만 필터링
        .order('tab_no', { ascending: true }); // tab_no 기준 정렬 (작은값 → 큰값)
  
      if (error) {
        console.error("❌ Supabase 에러:", error.message);
        throw error;
      }
  
      console.log("🎯 가져온 에피소드 데이터:", data);
      return data;  
    } catch (error) {
      console.error("❌ 에피소드 불러오기 실패:", error);
      throw error;
    }
  };
  
  
  