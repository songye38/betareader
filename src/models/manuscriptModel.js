import supabase from '@/supabase/supabaseClient';

// 유저 아이디로만 필터링하는 함수
export const fetchManuscriptsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count, isSetup')
    .eq('user_id', userId) // 특정 유저의 원고만 필터링
    .order('last_edited_at', { ascending: false }) // 최신 수정 기준 내림차순 정렬
    .limit(5); // 상위 5개만 가져오기

  if (error) {
    throw new Error('Manuscript fetch error: ' + error.message);
  }

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
