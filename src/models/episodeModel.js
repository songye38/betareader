import supabase from '@/supabase/supabaseClient';
import * as Sentry from '@sentry/react'; // Sentry import 추가

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  const isNew = !requestData.id;
  console.log("requestData", requestData);
  console.log("isNew", isNew);

  try {
    const { data, error } = await supabase
      .from('episode')
      .upsert(
        {
          id: requestData.id,
          tab_no: requestData.tabNo,
          manuscript_id: requestData.manuscriptId,
          title: requestData.title,
          tab_id: requestData.tabId,
          content: requestData.content,
          type: requestData.type,
        },
        { onConflict: ['tab_id'] }
      )
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("✅ 에피소드 저장/수정 성공", data);
    return { data, isNew };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { requestData, isNew }, // 추가된 부분
    });
    console.error("❌ 에피소드 저장 실패:", error);
    throw error;
  }
};

// 최근 에피소드 가져오기
export const getRecentEpisodes = async (userId) => {
  try {
    const { data: manuscripts, error: manuscriptError } = await supabase
      .from('manuscript')
      .select('id')
      .eq('user_id', userId);

    if (manuscriptError) {
      console.error("❌ manuscript 가져오기 에러:", manuscriptError.message);
      throw manuscriptError;
    }

    const manuscriptIds = manuscripts.map(m => m.id);

    if (manuscriptIds.length === 0) {
      return [];
    }

    const { data: episodes, error: episodeError } = await supabase
      .from('episode')
      .select(`
        *,
        manuscript (
          id,
          user_id,
          title
        )
      `)
      .in('manuscript_id', manuscriptIds)
      .order('last_edited_at', { ascending: false })
      .limit(5);

    if (episodeError) {
      console.error("❌ episode 가져오기 에러:", episodeError.message);
      throw episodeError;
    }

    console.log("api에서 가져온 최종 데이터:", episodes);
    return episodes;
    
  } catch (error) {
    Sentry.captureException(error, {
      extra: { userId }, // 추가된 부분
    });
    console.error("❌ 에피소드 불러오기 실패:", error);
    throw error;
  }
};

// 특정 원고의 에피소드 가져오기
export const getEpisodesByManuId = async (userId, manuscriptId) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .select('*')
      .eq('manuscript_id', manuscriptId)
      .order('tab_no', { ascending: true });

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: { userId, manuscriptId }, // 추가된 부분
    });
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
      .eq('id', episodeId)
      .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("에피소드 삭제 성공", data);
    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: { episodeId }, // 추가된 부분
    });
    console.error("❌ 에피소드 삭제 실패:", error);
    throw error;
  }
};

// 에피소드의 is_feedback_mode 수정 함수
export const updateEpisodeFeedbackMode = async (episodeId, newFeedbackMode) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .update({ is_feedback_mode: newFeedbackMode })
      .eq('id', episodeId)
      .single();

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("is_feedback_mode 업데이트 성공", data);
    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: { episodeId, newFeedbackMode }, // 추가된 부분
    });
    console.error("❌ 에피소드 수정 실패:", error);
    throw error;
  }
};
