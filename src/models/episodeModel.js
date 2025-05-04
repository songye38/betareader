import supabase from '@/supabase/supabaseClient';
import * as Sentry from '@sentry/react'; // Sentry import

// --- 에피소드 저장 ---
export const saveEpisode = async (requestData) => {
  const isNew = !requestData.id;

  Sentry.addBreadcrumb({
    category: 'episode',
    message: `saveEpisode 시작 (isNew: ${isNew})`,
    level: 'info',
  });

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

    Sentry.addBreadcrumb({
      category: 'episode',
      message: 'saveEpisode 성공',
      level: 'info',
    });

    console.log("✅ 에피소드 저장/수정 성공", data);
    return { data, isNew };
  } catch (error) {
    Sentry.captureException(error, { extra: { requestData, isNew } });
    console.error("❌ 에피소드 저장 실패:", error);
    throw error;
  }
};

// --- 최근 에피소드 가져오기 ---
export const getRecentEpisodes = async (userId) => {
  console.log("getRecentEpisodes함수 호출")
  Sentry.addBreadcrumb({
    category: 'episode',
    message: `getRecentEpisodes 시작 (userId: ${userId})`,
    level: 'info',
  });

  try {
    const { data: manuscripts, error: manuscriptError } = await supabase
      .from('manuscript')
      .select('id')
      .eq('user_id', userId);

    if (manuscriptError) {
      console.error("❌ manuscript 가져오기 에러:", manuscriptError.message);
      throw manuscriptError;
    }

    if (!manuscripts || manuscripts.length === 0) {
      console.warn("⚠️ 해당 userId에 manuscripts 없음", userId);
      Sentry.captureMessage('manuscripts 없음', {
        level: 'warning',
        extra: { userId },
      });
      return [];
    }

    const manuscriptIds = manuscripts.map(m => m.id);

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

    if (!episodes || episodes.length === 0) {
      console.warn("⚠️ manuscripts에는 있으나 episodes 없음", manuscriptIds);
      Sentry.captureMessage('episodes 없음', {
        level: 'warning',
        extra: { userId, manuscriptIds },
      });
      return [];
    }

    Sentry.addBreadcrumb({
      category: 'episode',
      message: 'getRecentEpisodes 성공',
      level: 'info',
    });

    console.log("✅ api에서 가져온 최종 데이터:", episodes);
    return episodes;
  } catch (error) {
    Sentry.captureException(error, { extra: { userId } });
    console.error("❌ 에피소드 불러오기 실패:", error);
    throw error;
  }
};

// --- 특정 원고의 에피소드 가져오기 ---
export const getEpisodesByManuId = async (userId, manuscriptId) => {
  Sentry.addBreadcrumb({
    category: 'episode',
    message: `getEpisodesByManuId 시작 (manuscriptId: ${manuscriptId})`,
    level: 'info',
  });

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

    if (!data || data.length === 0) {
      console.warn("⚠️ manuscriptId에 연결된 episodes 없음", manuscriptId);
      Sentry.captureMessage('episodes 없음 (manuscript)', {
        level: 'warning',
        extra: { userId, manuscriptId },
      });
      return [];
    }

    Sentry.addBreadcrumb({
      category: 'episode',
      message: 'getEpisodesByManuId 성공',
      level: 'info',
    });

    console.log("✅ 에피소드 리스트 가져오기 성공", data);
    return data;
  } catch (error) {
    Sentry.captureException(error, { extra: { userId, manuscriptId } });
    console.error("❌ 에피소드 불러오기 실패:", error);
    throw error;
  }
};

// --- 에피소드 삭제 ---
export const deleteEpisode = async (episodeId) => {
  Sentry.addBreadcrumb({
    category: 'episode',
    message: `deleteEpisode 시작 (episodeId: ${episodeId})`,
    level: 'info',
  });

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

    Sentry.addBreadcrumb({
      category: 'episode',
      message: 'deleteEpisode 성공',
      level: 'info',
    });

    console.log("✅ 에피소드 삭제 성공", data);
    return data;
  } catch (error) {
    Sentry.captureException(error, { extra: { episodeId } });
    console.error("❌ 에피소드 삭제 실패:", error);
    throw error;
  }
};

// --- 피드백 모드 수정 ---
export const updateEpisodeFeedbackMode = async (episodeId, newFeedbackMode) => {
  Sentry.addBreadcrumb({
    category: 'episode',
    message: `updateEpisodeFeedbackMode 시작 (episodeId: ${episodeId})`,
    level: 'info',
  });

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

    Sentry.addBreadcrumb({
      category: 'episode',
      message: 'updateEpisodeFeedbackMode 성공',
      level: 'info',
    });

    console.log("✅ is_feedback_mode 업데이트 성공", data);
    return data;
  } catch (error) {
    Sentry.captureException(error, { extra: { episodeId, newFeedbackMode } });
    console.error("❌ 에피소드 수정 실패:", error);
    throw error;
  }
};
