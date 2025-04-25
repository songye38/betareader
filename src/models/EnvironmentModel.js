import supabase from '@/supabase/supabaseClient';
import { toast } from 'react-toastify';
import { getEnvironmentType } from '@/utils/typeMappings';

// 아이디어 저장 함수
export const createEnvironment = async (environment, manuscriptId) => {
  try {
    const { title, type, description, newKeywords, note } = environment;

    const { data, error } = await supabase
      .from('environment')
      .insert([
        {
          manuscript_id: manuscriptId,
          title,
          type: getEnvironmentType(environment.dropdown),
          description,
          reference_list: newKeywords,
          notes: note,
        },
      ])
      .select()
      .single(); // 단일 객체 반환

    if (error) {
      toast.error("세계관 생성 실패")
      console.error('[세계관 생성 실패]', error.message);
      throw new Error('세계관을 저장하는 도중 문제가 발생했습니다.');
    }

    toast.success("세계관 생성 성공");
    console.log('[세계관 저장 완료]', data);
    return data;
  } catch (err) {
    console.error('[createEnvironment 예외 발생]', err.message);
    throw err;
  }
};

export const updateEnvironment = async (environment, environmentId, manuscriptId) => {
  try {
    const { title, type, description, newKeywords, note } = environment;

    const { data, error } = await supabase
      .from('environment')
      .update({
        title,
        type: getEnvironmentType(environment.dropdown),
        description,
        reference_list: newKeywords,
        notes: note,
      })
      .eq('id', environmentId)
      .eq('manuscript_id', manuscriptId)
      .select()
      .single();

    if (error) {
      toast.error("세계관 수정 실패");
      console.error('[세계관 수정 실패]', error.message);
      throw new Error('세계관을 수정하는 도중 문제가 발생했습니다.');
    }

    toast.success("세계관 수정 성공");
    console.log('[세계관 수정 완료]', data);
    return data;
  } catch (err) {
    console.error('[updateEnvironment 예외 발생]', err.message);
    throw err;
  }
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

export const getEnvironmentByManuscript = async (id, manuscriptId) => {
  const { data, error } = await supabase
    .from('environment')
    .select('*')
    .eq('id', id)
    .eq('manuscript_id', manuscriptId)
    .order('created_at', { ascending: false })
    .single();

  if (error) {
    console.error('세계관 목록 불러오기 실패:', error.message);
    throw new Error('세계관을 불러오는 중 오류가 발생했습니다.');
  }

  return data;
};



// 환경(id) 삭제 함수
export const deleteEnvironmentById = async (id) => {
  try {
    const { error } = await supabase
      .from('environment')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[세계관 삭제 실패]', error.message);
      toast.error("세계관 삭제 실패");
      throw new Error('세계관 삭제 중 오류가 발생했습니다.');
    }

    toast.success("세계관이 삭제되었습니다.");
  } catch (err) {
    console.error('[deleteEnvironmentById 예외 발생]', err.message);
    toast.error("삭제 도중 문제가 발생했습니다.");
    throw err;
  }
};









