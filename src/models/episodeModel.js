import supabase from '@/supabase/supabaseClient';

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  const isNew = !requestData.id; // id가 없으면 새로 저장
  console.log("requestData", requestData);
  console.log("isNew", isNew);

  try {
    const { data, error } = await supabase
      .from('episode')
      .upsert(
        {
          id: requestData.id, // 처음 저장이면 undefined, 수정이면 존재
          tab_no: requestData.tabNo,
          manuscript_id: requestData.manuscriptId,
          title: requestData.title,
          tab_id: requestData.tabId,
          content: requestData.content,
          type: requestData.type,
        },
        { onConflict: ['tab_id'] } // 'id'가 충돌하면 update
      )
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("✅ 에피소드 저장/수정 성공", data);
    return { data, isNew }; // 신규 여부 함께 반환
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
          user_id,
          title
          )
        `)  // episode 테이블의 모든 칼럼과 manuscript 테이블의 user_id를 선택
      .eq('manuscript.user_id', userId)  // manuscript 테이블의 user_id가 매개변수 userId와 일치하는 에피소드만 필터링
      .order('last_edited_at', { ascending: false })  // 최신순으로 정렬
      .limit(5);  // 최대 5개만 가져오기

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

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
      .select(
        '*'
      )
      .eq('manuscript_id', manuscriptId)  // 특정 userId의 원고만 가져옴
      .order('tab_no', { ascending: true }); // tab_no 기준 정렬 (작은값 → 큰값)

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("❌ 에피소드 불러오기 실패:", error);
    throw error;
  }
};


// 에피소드 삭제 함수
export const deleteEpisode = async (episodeId) => {

  console.log("episodeId", episodeId);
  try {
    const { data, error } = await supabase
      .from('episode')
      .delete()
      .eq('id', episodeId) // id가 episodeId와 일치하는 에피소드 삭제

      .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("에피소드 삭제 성공", data);
    return data;  // 삭제된 데이터 반환
  } catch (error) {
    console.error("❌ 에피소드 삭제 실패:", error);
    throw error;
  }
};

// 에피소드의 is_feedback_mode 수정 함수
export const updateEpisodeFeedbackMode = async (episodeId, newFeedbackMode) => {
  try {
    // 'episodeId'에 해당하는 에피소드의 'is_feedback_mode' 값을 'newFeedbackMode'로 수정
    const { data, error } = await supabase
      .from('episode')
      .update({ is_feedback_mode: newFeedbackMode })  // 수정할 컬럼과 값을 지정
      .eq('id', episodeId)  // episodeId와 일치하는 항목을 찾아서 수정
      .single();  // 하나의 결과만 반환받기 위해 .single() 사용

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("is_feedback_mode 업데이트 성공", data);
    return data;  // 수정된 데이터 반환
  } catch (error) {
    console.error("❌ 에피소드 수정 실패:", error);
    throw error;
  }
};
