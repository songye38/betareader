import supabase from '@/supabase/supabaseClient';
import { toast } from 'react-toastify';
import { getIdeaType } from '@/utils/typeMappings';




export const createIdea = async (idea, manuscriptId) => {
  console.log("idea 객체에는 무엇이 들어오나", idea,manuscriptId);

  try {
    const { data, error } = await supabase
      .from('idea')
      .insert([
        {
          manuscript_id: manuscriptId,
          title: idea.title,
          category: getIdeaType(idea.dropdown),
          description: idea.episode,
          tags: idea.newKeywords,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('아이디어 저장 실패:', error.message);
      toast.error("아이디어 저장 실패");
      throw new Error(error.message);
    }

    toast.success("아이디어 저장 성공!");
    return data;
  } catch (err) {
    console.error("예외 발생:", err.message);
    toast.error("아이디어 저장 중 예외 발생");
    throw err;
  }
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

export const getIdeaByManuscript = async (id,manuscriptId) => {
  const { data, error } = await supabase
    .from('idea')
    .select('*')
    .eq('id', id)
    .eq('manuscript_id', manuscriptId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('아이디어 목록 불러오기 실패:', error.message);
    throw new Error('아이디어를 불러오는 중 오류가 발생했습니다.');
  }

  return data;
};