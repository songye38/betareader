
import supabase from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

/**
 * 댓글 링크 생성 함수
 * @param {number} episodeId - 에피소드 ID
 * @param {number} minRequiredComments - 최소 피드백 개수 (5, 10, 15, 20 중 하나)
 * @returns {Promise<object>} - 생성된 댓글 링크 row
 */


export const createCommentLink = async (episodeId, minRequiredComments) => {
  console.log("댓글 링크 생성 시작:", episodeId, minRequiredComments);

  try {
    const { data, error } = await supabase
      .from("comment_links")
      .insert([
        {
          episode_id: episodeId,
          min_required_comments: minRequiredComments,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("댓글 링크 생성 실패:", error.message);
      toast.error("댓글 링크 생성 실패");
      throw new Error(error.message);
    }

    toast.success("댓글 링크가 생성되었습니다!");
    console.log("생성된 댓글 링크:", data);
    return data;
  } catch (err) {
    console.error("댓글 링크 생성 중 예외:", err.message);
    toast.error("댓글 링크 생성 중 오류 발생");
    throw err;
  }
};


/**
 * 주어진 댓글 링크가 만료되었는지 확인하고, 만료되었으면 업데이트
 * @param {string} linkId - 댓글 링크의 UUID
 * @returns {Promise<boolean>} - 만료 여부 (true: 만료됨, false: 유효함)
 */
// export const checkAndUpdateExpiredStatus = async (linkId) => {
//     console.log("✅ linkId:", linkId, typeof linkId);


//     try {
//       // 1. 해당 링크의 created_at, expired 가져오기
//       const { data, error } = await supabase
//         .from("comment_links")
//         .select("created_at, expired")
//         .eq("id", linkId)
//         .maybeSingle();

//         console.log("📦 Supabase 응답 data:", data);
//         console.log("❌ Supabase 응답 error:", error);

//         // error가 있을 때 출력
//     if (error) {
//         console.error("쿼리 오류:", error.message);
//         return { expired: true }; // 오류 발생 시 만료 처리
//       }
  
//       if (error || !data) {
//         console.error("링크 정보를 불러오는 데 실패했습니다:", error?.message);
//         return { expired: true }; // 정보를 못 불러오면, 안전하게 만료로 처리
//       }
  
//       const { created_at, expired } = data;

//       console.log("data",data);
  
//       // 2. 이미 만료되었으면 true 리턴
//       if (expired) return { expired: true };
  
//       // 3. 현재 시간과 created_at 비교
//       const createdTime = new Date(created_at);
//       const now = new Date();
  
//       const hoursPassed = (now - createdTime) / (1000 * 60 * 60); // ms → 시간
  
//       if (hoursPassed >= 24) {
//         // 4. 24시간 지났으면 expired = true 로 업데이트
//         const { error: updateError } = await supabase
//           .from("comment_links")
//           .update({ expired: true })
//           .eq("id", linkId);
  
//         if (updateError) {
//           console.error("expired 업데이트 실패:", updateError.message);
//         }
  
//         return { expired: true };
//       }
  
//       // 5. 아직 유효함 → created_at 함께 리턴
//       return { expired: false, created_at };
//     } catch (err) {
//       console.error("만료 여부 확인 중 예외:", err.message);
//       return { expired: true }; // 예외 시에도 만료로 간주
//     }
//   };
  
export const checkAndUpdateExpiredStatus = async (linkId) => {

  
    try {
      // 1. 해당 링크의 created_at, expired 가져오기
      const { data, error } = await supabase
        .from("comment_links")
        .select("created_at, expired")
        .eq("id", linkId)
        .single();

        console.log("hello world");
  
      console.log("📦 Supabase 응답 data:", data);
      console.log("❌ Supabase 응답 error:", error);
  
      if (error) {
        console.error("쿼리 오류:", error.message);
        return { expired: true }; // 오류 발생 시 만료 처리
      }
  
      if (!data) {
        console.error("링크 정보를 불러오는 데 실패했습니다.");
        return { expired: true }; // 정보를 못 불러오면, 안전하게 만료 처리
      }
  
      const { created_at, expired } = data;
  
      // 만약 expired가 true라면 바로 리턴
      if (expired) {
        console.log("🔒 이미 만료된 링크입니다.");
        return { expired: true };
      }
  
      // 2. 시간 계산 및 만료 여부 확인
      const createdTime = new Date(created_at);
      const now = new Date();
      const hoursPassed = (now - createdTime) / (1000 * 60 * 60); // ms → 시간
  
      console.log("⏳ 경과 시간:", hoursPassed);
  
      // 3. 24시간이 지났으면 만료 처리
      if (hoursPassed >= 24) {
        const { error: updateError } = await supabase
          .from("comment_links")
          .update({ expired: true })
          .eq("id", linkId);
  
        if (updateError) {
          console.error("❌ expired 업데이트 실패:", updateError.message);
        }
  
        console.log("24시간 경과하여 만료 처리됨.");
        return { expired: true };
      }
  
      // 4. 아직 유효한 링크일 경우
      console.log("✅ 링크는 아직 유효합니다.");
      return { expired: false, created_at };
  
    } catch (err) {
      console.error("만료 여부 확인 중 예외 발생:", err.message);
      return { expired: true }; // 예외 발생 시 만료 처리
    }
  };
  
  
  