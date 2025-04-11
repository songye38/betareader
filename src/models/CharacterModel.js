import supabase from '@/supabase/supabaseClient';


// 아이디어 저장 함수
export const createCharacter = async (character,manuscriptId) => {
  const { name, role, age, gender,personality,appearance ,backstory,goal,famous_quote} = character;


  const { data, error } = await supabase
    .from('character') // 테이블 이름
    .insert([
      {
        manuscript_id : manuscriptId,
        name, 
        role, 
        age, 
        gender,
        personality,
        appearance ,
        backstory,
        goal,
        famous_quote
        
      },
    ])
    .select();

  if (error) {
    console.error('캐릭터 저장 실패:', error.message);
    throw new Error('캐릭터 저장 중 오류가 발생했습니다.');
  }

  return data[0]; // 저장된 데이터 반환
};

// 특정 manuscript_id로 아이디어 목록 가져오기
export const getCharactersByManuscript = async (manuscriptId) => {
    const { data, error } = await supabase
      .from('character')
      .select('*')
      .eq('manuscript_id', manuscriptId)
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('캐릭터 목록 불러오기 실패:', error.message);
      throw new Error('캐릭터를 불러오는 중 오류가 발생했습니다.');
    }
  
    return data;
  };
