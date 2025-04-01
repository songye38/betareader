import supabase from '@/supabase/supabaseClient';

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .insert(
          {
            tab_no: requestData.tabNo,
            manuscript_id: requestData.manuscriptId,
            title: requestData.title,
            tab_id: requestData.tabId,
            content: requestData.content,
            type: requestData.type,
          },
      )
      .single();

     // .upsert({ username: 'supabot' }, { onConflict: 'username' })


    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;
    }

    console.log("데이터베이스 저장 성공", data);
    return data;
  } catch (error) {
    console.error("❌ 에피소드 저장 실패:", error);
    throw error;
  }
};
