import supabase from '@/supabase/supabaseClient';

// 유저 아이디로만 필터링하는 함수
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
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data;
};


// 원고 아이디로만 필터링하는 함수
export const fetchManuscriptById = async (manuscriptId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count')
    .eq('id', manuscriptId) // 특정 manuscriptId로 필터링
    .single(); // 단일 원고만 반환

  if (error) {
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data;
};

// 유저 아이디와 원고 아이디가 모두 있을 때 가져오는 함수
export const fetchManuscripts = async (userId, manuscriptId = null) => {
  if (manuscriptId) {
    // manuscriptId가 있을 경우 해당 원고를 가져옵니다.
    return await fetchManuscriptById(manuscriptId);
  }

  // manuscriptId가 없을 경우 userId로 원고들을 가져옵니다.
  return await fetchManuscriptsByUserId(userId);
};

// 원고집 id로 원고 삭제
// export const deleteManuscriptById = async (manuscriptId) => {
//   const { data, error } = await supabase
//     .from('manuscript')
//     .delete()
//     .eq('id', manuscriptId);

//   if (error) {
//     throw new Error('Manuscript delete error: ' + error.message);
//   }

//   return data; // 삭제된 row 정보 반환
// };


//delta값은 기본적으로 1이고 -1은 넣으면 episode_count를 하나 줄인다. 
export const updateEpisodeCount = async (manuscriptId, delta = 1) => {
  try {
    // 현재 episode_count 가져오기
    const { data: currentData, error: fetchError } = await supabase
      .from('manuscript')
      .select('episode_count')
      .eq('id', manuscriptId)
      .single();

    if (fetchError) {
      console.error('📛 Fetch error:', fetchError);
      throw new Error('에피소드 수를 가져오는 중 오류가 발생했습니다.');
    }

    const newCount = Math.max((currentData.episode_count || 0) + delta, 0); // 0 이하로 내려가지 않게

    // episode_count 업데이트
    const { data, error: updateError } = await supabase
      .from('manuscript')
      .update({
        episode_count: newCount,
      })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (updateError) {
      console.error('📛 Update error:', updateError);
      throw new Error('에피소드 수 업데이트 중 오류가 발생했습니다.');
    }

    return data;

  } catch (error) {
    console.error('❌ updateEpisodeCount 실패:', error.message);
    return null;
  }
};


// 에피소드 수정 시 last_edited_at 갱신
export const updateLastEditedAt = async (manuscriptId) => {
  try {
    const now = new Date().toISOString(); // 현재 시간 ISO 형식으로

    // last_edited_at 업데이트
    const { data, error: updateError } = await supabase
      .from('manuscript')
      .update({
        last_edited_at: now,
      })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (updateError) {
      console.error('📛 Update error:', updateError);
      throw new Error('마지막 수정 시간 업데이트 중 오류가 발생했습니다.');
    }

    return data;

  } catch (error) {
    console.error('❌ updateLastEditedAt 실패:', error.message);
    return null;
  }
};

// 원고 제목 수정
export const updateManuscriptTitle = async (manuscriptId, newTitle) => {
  try {
    const { data, error } = await supabase
      .from('manuscript')
      .update({
        title: newTitle,
      })
      .eq('id', manuscriptId)
      .select()
      .single();

    if (error) {
      console.error('📛 Update error:', error);
      throw new Error('제목 업데이트 중 오류가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error('❌ updateManuscriptTitle 실패:', error.message);
    return null;
  }
};


// 원고집 삭제
export const deleteManuscriptById = async (manuscriptId) => {
  try {
    const { data, error } = await supabase
      .from('manuscript')
      .delete()
      .eq('id', manuscriptId) // id에 맞는 원고집을 삭제
      .single(); // 삭제된 원고 데이터를 반환

    if (error) {
      console.error('📛 Delete error:', error);
      throw new Error('원고집 삭제 중 오류가 발생했습니다.');
    }

    return data; // 삭제된 원고 데이터를 반환
  } catch (error) {
    console.error('❌ deleteManuscriptById 실패:', error.message);
    return null;
  }
};



