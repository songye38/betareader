import supabase from '@/supabase/supabaseClient';

export const fetchManuscripts = async (userId) => {
  const { data, error } = await supabase
    .from('manuscript')
    .select('id, user_id, title, last_edited_at, episode_count')
    .eq('user_id', userId) // 특정 유저의 원고만 필터링
    .order('last_edited_at', { ascending: false }) // 최신 수정 기준 내림차순 정렬
    .limit(5); // 상위 5개만 가져오기

  if (error) {
    throw new Error('Manuscript fetch error: ' + error.message);
  }

  return data;
};
