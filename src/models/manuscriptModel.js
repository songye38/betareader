import supabase from '@/supabase/supabaseClient';
import * as Sentry from '@sentry/react'; // Sentry import 추가!

/** --- fetchManuscriptsByUserId --- */
export const fetchManuscriptsByUserId = async (userId, limit = null) => {
  let query = supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count')
    .eq('user_id', userId)
    .order('last_edited_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    Sentry.captureException(error, {
      extra: { userId, limit },
    });
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data;
};

/** --- fetchManuscriptById --- */
export const fetchManuscriptById = async (manuscriptId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count')
    .eq('id', manuscriptId)
    .single();

  if (error) {
    Sentry.captureException(error, {
      extra: { manuscriptId },
    });
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data;
};

/** --- fetchManuscripts --- */
export const fetchManuscripts = async (userId, manuscriptId = null) => {
  try {
    if (manuscriptId) {
      return await fetchManuscriptById(manuscriptId);
    }
    return await fetchManuscriptsByUserId(userId);
  } catch (error) {
    Sentry.captureException(error, {
      extra: { userId, manuscriptId },
    });
    throw error;
  }
};

/** --- updateEpisodeCount --- */
export const updateEpisodeCount = async (manuscriptId, delta = 1) => {
  try {
    const { data: currentData, error: fetchError } = await supabase
      .from('manuscript')
      .select('episode_count')
      .eq('id', manuscriptId)
      .single();

    if (fetchError) {
      Sentry.captureException(fetchError, {
        extra: { manuscriptId, stage: 'fetch episode_count' },
      });
      throw new Error('에피소드 수를 가져오는 중 오류가 발생했습니다.');
    }

    const newCount = Math.max((currentData.episode_count || 0) + delta, 0);

    const { data, error: updateError } = await supabase
      .from('manuscript')
      .update({ episode_count: newCount })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (updateError) {
      Sentry.captureException(updateError, {
        extra: { manuscriptId, delta, newCount, stage: 'update episode_count' },
      });
      throw new Error('에피소드 수 업데이트 중 오류가 발생했습니다.');
    }

    return data;

  } catch (error) {
    Sentry.captureException(error, {
      extra: { manuscriptId, delta },
    });
    console.error('❌ updateEpisodeCount 실패:', error.message);
    return null;
  }
};

/** --- updateLastEditedAt --- */
export const updateLastEditedAt = async (manuscriptId) => {
  try {
    const now = new Date().toISOString();

    const { data, error: updateError } = await supabase
      .from('manuscript')
      .update({ last_edited_at: now })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (updateError) {
      Sentry.captureException(updateError, {
        extra: { manuscriptId, now },
      });
      throw new Error('마지막 수정 시간 업데이트 중 오류가 발생했습니다.');
    }

    return data;

  } catch (error) {
    Sentry.captureException(error, {
      extra: { manuscriptId },
    });
    console.error('❌ updateLastEditedAt 실패:', error.message);
    return null;
  }
};

/** --- updateManuscriptTitle --- */
export const updateManuscriptTitle = async (manuscriptId, newTitle) => {
  try {
    const { data, error } = await supabase
      .from('manuscript')
      .update({ title: newTitle })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (error) {
      Sentry.captureException(error, {
        extra: { manuscriptId, newTitle },
      });
      throw new Error('제목 업데이트 중 오류가 발생했습니다.');
    }

    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: { manuscriptId, newTitle },
    });
    console.error('❌ updateManuscriptTitle 실패:', error.message);
    return null;
  }
};

/** --- deleteManuscriptById --- */
export const deleteManuscriptById = async (manuscriptId) => {
  try {
    const { data, error } = await supabase
      .from('manuscript')
      .delete()
      .eq('id', manuscriptId)
      .single();

    if (error) {
      Sentry.captureException(error, {
        extra: { manuscriptId },
      });
      throw new Error('원고집 삭제 중 오류가 발생했습니다.');
    }

    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: { manuscriptId },
    });
    console.error('❌ deleteManuscriptById 실패:', error.message);
    return null;
  }
};
