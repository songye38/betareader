import supabase from '@/supabase/supabaseClient';

// 아이디어 저장 함수
export const createIdea = async (idea, userId) => {
  const { title, category, description, tags } = idea;

  const { data, error } = await supabase
    .from('idea') // 테이블 이름
    .insert([
      {
        user_id: userId,
        manuscript_id : manuscript_id,
        title,
        category,
        description,
        tags, // Supabase에서 tags 컬럼이 배열로 저장 가능해야 함 (type: text[])
        created_at: new Date().toISOString(), // created_at 필드가 있다면 추가
      },
    ])
    .select();

  if (error) {
    console.error('아이디어 저장 실패:', error.message);
    throw new Error('아이디어 저장 중 오류가 발생했습니다.');
  }

  return data[0]; // 저장된 데이터 반환
};
