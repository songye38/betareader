import supabase from '@/supabase/supabaseClient';

export const fetchManuscripts = async (userId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id,title, last_edited_at, episode_count') // episode_count 칼럼을 가져옵니다.
    .eq('user_id', userId); // 로그인된 유저 ID 필터링

  if (error) {
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data; // 가져온 데이터를 반환
};
