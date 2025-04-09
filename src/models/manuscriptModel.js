import supabase from '@/supabase/supabaseClient';

// 유저 아이디로만 필터링하는 함수
export const fetchManuscriptsByUserId = async (userId, limit = null) => {
  let query = supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count, isSetup')
    .eq('user_id', userId)
    .order('last_edited_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  console.log("서버에서 가져온 데이터", data);

  return data;
};


// 원고 아이디로만 필터링하는 함수
export const fetchManuscriptById = async (manuscriptId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count, isSetup')
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


export const deleteManuscriptById = async (manuscriptId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .delete()
    .eq('id', manuscriptId);

  if (error) {
    throw new Error('Manuscript delete error: ' + error.message);
  }

  return data; // 삭제된 row 정보 반환
};