import supabase from '@/supabase/supabaseClient';

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .insert([
        {
          manuscript_id : requestData.manuscriptId,  
          title: requestData.title,
          tab_id: requestData.tabId,
          content: requestData.content,
          type: requestData.type,
        },
      ])
      .single(); // 단일 데이터 반환

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      return { error };
    }

    return data; // 성공적으로 저장된 데이터 반환
  } catch (error) {
    console.error("❌ 에피소드 저장 실패:", error);
    return { error };
  }
};
