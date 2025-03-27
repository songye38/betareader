import supabase from '@/supabase/supabaseClient';

// 에피소드 저장 함수
export const saveEpisode = async (requestData) => {
  try {
    const { data, error } = await supabase
      .from('episode')
      .insert([
        {
          tab_no: requestData.tabNo,
          manuscript_id: requestData.manuscriptId,
          title: requestData.title,
          tab_id: requestData.tabId,
          content: requestData.content,
          type: requestData.type,
        },
      ])
      .single(); // 단일 데이터 반환

    if (error) {
      console.error("❌ Supabase 에러:", error.message);
      throw error;  // 에러가 발생하면 즉시 함수 종료
    }

    console.log("데이터베이스 저장 성공", data);
    return data;  // 데이터가 성공적으로 저장되면 반환
  } catch (error) {
    console.error("❌ 에피소드 저장 실패:", error);
    throw error;  // 에러를 던져서 호출한 곳에서 처리하도록
  }
};
