import supabase from '@/supabase/supabaseClient';

// 아이디어 저장 함수
export const createIdea = async (idea,manuscriptId) => {
  const { title, category, description, tags } = idea;

  const { data, error } = await supabase
    .from('idea') // 테이블 이름
    .insert([
      {
        manuscript_id : manuscriptId,
        title,
        category,
        description,
        tags, 
      },
    ])
    .select();

  if (error) {
    console.error('아이디어 저장 실패:', error.message);
    throw new Error('아이디어 저장 중 오류가 발생했습니다.');
  }

  return data[0]; // 저장된 데이터 반환
};


// 특정 manuscript_id로 아이디어 목록 가져오기
export const getIdeasByManuscript = async (manuscriptId) => {
  const { data, error } = await supabase
    .from('idea')
    .select('*')
    .eq('manuscript_id', manuscriptId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('아이디어 목록 불러오기 실패:', error.message);
    throw new Error('아이디어를 불러오는 중 오류가 발생했습니다.');
  }

  return data;
};