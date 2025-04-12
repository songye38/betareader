import supabase from '@/supabase/supabaseClient';
import { getCharacterType,getGenderType } from '@/utils/typeMappings';
import { toast } from 'react-toastify';


// 아이디어 저장 함수
export const createCharacter = async (character,manuscriptId) => {
  try {
    const { name,age,appearance,character_type,gender,goal,newKeywords,backstory } = character;

    console.log("들어오는 데이터는", character);

    const { data, error } = await supabase
      .from('character')
      .insert([
        {
          manuscript_id: manuscriptId,
          name : name,
          role: getCharacterType(character_type),
          age,
          gender: getGenderType(gender),
          appearance : appearance,
          goal : goal,
          personality : newKeywords,
          backstory : backstory,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('📛 Supabase insert error:', error);
      toast.error('캐릭터 저장 실패: ' + error.message);
      throw new Error('캐릭터 저장 중 오류가 발생했습니다.');
    }

    toast.success('데이터 저장 성공');
    return data;
  } catch (err) {
    console.error('🚨 createCharacter 함수 에러:', err);
    toast.error('예기치 못한 오류 발생');
    throw err;
  }
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

export const getCharacterByManuscript = async (id,manuscriptId) => {
  const { data, error } = await supabase
    .from('character')
    .select('*')
    .eq('id', id)
    .eq('manuscript_id', manuscriptId)
    .order('created_at', { ascending: false })
    .single();

  if (error) {
    console.error('캐릭터 불러오기 실패:', error.message);
    throw new Error('캐릭터 정보를 불러오는 중 오류가 발생했습니다.');
  }

  return data;
};


  // 환경(id) 삭제 함수
export const deleteCharacterById = async (id) => {
  try {
    const { error } = await supabase
      .from('character')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[캐릭터 삭제 실패]', error.message);
      toast.error("캐릭터 삭제 실패");
      throw new Error('캐릭터 삭제 중 오류가 발생했습니다.');
    }

    toast.success("캐릭터가 삭제되었습니다.");
  } catch (err) {
    console.error('[deleteCharacterById 예외 발생]', err.message);
    toast.error("삭제 도중 문제가 발생했습니다.");
    throw err;
  }
};

