import supabase from '@/supabase/supabaseClient';

// 아이디어 저장 함수
export const createEnvironment = async (environment,manuscriptId) => {
  const { title,type,description,reference_list,notes} = environment;

  const { data, error } = await supabase
    .from('environment') // 테이블 이름
    .insert([
      {
        manuscript_id : manuscriptId,
        title,
        type,
        description,
        reference_list,
        notes
      },
    ])
    .select();

  if (error) {
    console.error('세계관 저장 실패:', error.message);
    throw new Error('세계관 저장 중 오류가 발생했습니다.');
  }

  return data[0]; // 저장된 데이터 반환
};

// 특정 manuscript_id로 아이디어 목록 가져오기
export const getEnvironmentsByManuscript = async (manuscriptId) => {
    const { data, error } = await supabase
      .from('environment')
      .select('*')
      .eq('manuscript_id', manuscriptId)
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('세계관 목록 불러오기 실패:', error.message);
      throw new Error('세계관을 불러오는 중 오류가 발생했습니다.');
    }
  
    return data;
  };

