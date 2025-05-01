/** 
* 에피소드 id별로 인사이트를 불러오는 함수 
*/

import { toast } from "react-toastify";
import supabase from "@/supabase/supabaseClient";

/**
 * 에피소드 id별로 인사이트를 불러오는 함수 
 */
export const fetchInsightsByEpisodeId = async (episodeId) => {
    console.log("💬 인사이트 세션별로 불러오기 시작:", episodeId);

    try {
        // 1️⃣ 먼저 comment_links 테이블에서 해당 episode의 모든 세션을 가져옴 (expired 추가!)
        const { data: links, error: linkError } = await supabase
            .from("comment_links")
            .select("id, session_order, expired") // ✅ expired도 가져옴
            .eq("episode_id", episodeId);

        if (linkError) {
            console.error("❌ 링크 조회 실패:", linkError.message);
            toast.error("댓글 링크 정보를 불러오는 중 문제가 발생했어요.");
            throw new Error(linkError.message);
        }

        if (!links || links.length === 0) {
            return {}; // 댓글 없으면 빈 객체 리턴
        }

        // 2️⃣ 각 링크 id에 해당하는 인사이트 불러오기
        const linkIds = links.map(link => link.id);

        const { data: insights, error: insightsError } = await supabase
            .from("insights")
            .select("id, content, category, created_at, count, link_id")
            .in("link_id", linkIds)
            .order("created_at", { ascending: false });

        if (insightsError) {
            console.error("❌ 인사이트 조회 실패:", insightsError.message);
            toast.error("인사이트를 불러오는 중 문제가 발생했어요.");
            throw new Error(insightsError.message);
        }

        // 3️⃣ session_order 기준으로 그룹핑
        const linkMap = {};
        const expiredMap = {}; // ✅ expired 상태도 저장

        links.forEach(link => {
            linkMap[link.id] = link.session_order;
            expiredMap[link.session_order] = link.expired; // session_order별 expired 저장
        });

        const grouped = {};
        insights.forEach(insight => {
            const session = linkMap[insight.link_id] || 1;
            if (!grouped[session]) {
                grouped[session] = {
                    expired: expiredMap[session] || false, // ✅ expired 정보 넣기
                    insights: [],
                };
            }
            grouped[session].insights.push(insight);
        });

        console.log("📦 세션별 인사이트 그룹핑 완료:", grouped);
        return grouped;
    } catch (err) {
        console.error("인사이트 세션별 불러오기 중 예외:", err.message);
        toast.error("알 수 없는 오류로 인사이트를 불러오지 못했어요.");
        throw err;
    }
};

