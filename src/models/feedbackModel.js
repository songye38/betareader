
import supabase from "@/supabase/supabaseClient";
import { toast } from "react-toastify";
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

/**
 * 댓글 링크 생성 함수
 * @param {number} episodeId - 에피소드 ID
 * @param {UUID} userId - 사용자 ID
 * @param {number} minRequiredComments - 최소 피드백 개수 (5, 10, 15, 20 중 하나)
 * @returns {Promise<object>} - 생성된 댓글 링크 row
 */
export const createCommentLink = async (episodeId, minRequiredComments, userId) => {
    console.log("댓글 링크 생성 시작:", episodeId, minRequiredComments);

    try {
        // ✅ 기존 링크 개수 확인
        const { data: existingLinks, error: fetchError } = await supabase
            .from("comment_links")
            .select("id")
            .eq("episode_id", episodeId);

        if (fetchError) {
            console.error("기존 링크 조회 실패:", fetchError.message);
            toast.error("기존 피드백 링크 조회 실패");
            throw new Error(fetchError.message);
        }

        const sessionOrder = existingLinks.length + 1;

        if (sessionOrder > 3) {
            toast.error("최대 3개의 피드백만 생성할 수 있습니다.");
            throw new Error("피드백 세션 초과");
        }

        // ✅ 새 피드백 링크 생성
        const { data, error } = await supabase
            .from("comment_links")
            .insert([
                {
                    episode_id: episodeId,
                    min_required_comments: minRequiredComments,
                    user_id: userId,
                    session_order: sessionOrder, // ⬅ 추가된 부분!
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("댓글 링크 생성 실패:", error.message);
            toast.error("댓글 링크 생성 실패");
            throw new Error(error.message);
        }

        toast.success(`🟢 ${sessionOrder}차 피드백 링크가 생성되었습니다!`);
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
export const checkAndUpdateExpiredStatus = async (linkId) => {
    console.log("session", await supabase.auth.getSession());


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

export const saveComment = async ({ linkId, content, password, name }) => {
    console.log('댓글 저장 시작:', { linkId, content, name, password });

    try {
        if (!content || content.trim() === '') {
            toast.error('댓글 내용을 입력해주세요.');
            return;
        }

        if (!password || password.length < 4) {
            toast.error('비밀번호는 최소 4자 이상이어야 해요.');
            return;
        }

        const passwordHash = await hashPassword(password);

        const { data, error } = await supabase
            .from('comments')
            .insert([
                {
                    link_id: linkId,
                    content: content.trim(),
                    name: name?.trim() || '익명',
                    password_hash: passwordHash,
                    is_ai: false,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('댓글 저장 실패:', error.message);
            toast.error('댓글 저장 중 문제가 발생했어요.');
            throw new Error(error.message);
        }

        toast.success('댓글이 저장되었습니다!');
        console.log('저장된 댓글:', data);
        return data;
    } catch (err) {
        console.error('댓글 저장 중 예외:', err.message);
        toast.error('알 수 없는 오류가 발생했어요.');
        throw err;
    }
};


/**
 * 특정 링크에 달린 모든 댓글을 불러오는 함수
 * @param {string} linkId - 댓글 링크 UUID
 * @returns {Promise<Array>} - 댓글 배열
 */
export const fetchComments = async (linkId) => {
    console.log("💬 댓글 불러오기 시작:", linkId);

    try {
        const { data, error } = await supabase
            .from("comments")
            .select("id, content, name, created_at, is_ai") // 필요한 필드만 선택
            .eq("link_id", linkId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("❌ 댓글 불러오기 실패:", error.message);
            toast.error("댓글을 불러오는 중 문제가 발생했어요.");
            throw new Error(error.message);
        }

        console.log("📦 불러온 댓글:", data);
        return data;
    } catch (err) {
        console.error("댓글 불러오기 중 예외:", err.message);
        toast.error("알 수 없는 오류로 댓글을 불러오지 못했어요.");
        throw err;
    }
};



/**
 * 링크 ID를 기반으로 에피소드와 작성자의 정보를 가져옵니다.
 *
 * @param {string} linkId - 댓글 링크 UUID
 * @returns {Promise<{
*   episodeTitle: string,
*   episodeContent: string,
*   username: string
* }>} 에피소드 제목, 내용, 작성자 이름을 포함한 객체를 반환
*
* @throws {Error} 링크 정보 또는 관련 데이터를 가져오는 도중 문제가 발생하면 예외를 던집니다.
*/

export const fetchLinkInfo = async (linkId) => {
    console.log("🔗 링크 정보 불러오기 시작:", linkId);

    try {
        // 먼저 comment_links에서 episode_id, user_id 가져오기
        const { data: linkData, error: linkError } = await supabase
            .from("comment_links")
            .select("episode_id, user_id")
            .eq("id", linkId)
            .single();

        if (linkError || !linkData) {
            console.error("❌ 링크 기본 정보 불러오기 실패:", linkError?.message);
            throw new Error(linkError?.message);
        }

        const { episode_id, user_id } = linkData;

        console.log("episode_id", episode_id);
        console.log("user_id", user_id);

        // 🔁 episode, profile 정보 병렬로 불러오기
        const [episodeRes, profileRes] = await Promise.all([
            supabase
                .from("episode")
                .select("title, content")
                .eq("id", episode_id)
                .single(),
            supabase
                .from("profile")
                .select("username")
                .eq("user_id", user_id)
                .single(),
        ]);

        console.log("episodeRes", episodeRes);
        console.log("profileRes", profileRes);

        if (episodeRes.error || profileRes.error) {
            console.error("❌ 세부 정보 불러오기 실패:", episodeRes.error?.message || profileRes.error?.message);
            throw new Error(episodeRes.error?.message || profileRes.error?.message);
        }

        const result = {
            episodeTitle: episodeRes.data.title,
            episodeContent: episodeRes.data.content,
            username: profileRes.data.username,
        };

        console.log("📘 최종 링크 관련 정보:", result);
        return result;
    } catch (err) {
        console.error("링크 정보 최종 예외:", err.message);
        throw err;
    }
};



export const fetchCommentsByEpisodeId = async (episodeId) => {
    console.log("💬 댓글 세션별로 불러오기 시작:", episodeId);

    try {
        // 1️⃣ 먼저 comment_links 테이블에서 해당 episode의 모든 세션을 가져옴
        const { data: links, error: linkError } = await supabase
            .from("comment_links")
            .select("id, session_order")
            .eq("episode_id", episodeId);

        if (linkError) {
            console.error("❌ 링크 조회 실패:", linkError.message);
            toast.error("댓글 링크 정보를 불러오는 중 문제가 발생했어요.");
            throw new Error(linkError.message);
        }

        if (!links || links.length === 0) {
            return {}; // 댓글 없으면 빈 객체 리턴
        }

        // 2️⃣ 각 링크 id에 해당하는 댓글 불러오기
        const linkIds = links.map(link => link.id);

        const { data: comments, error: commentError } = await supabase
            .from("comments")
            .select("id, content, name, created_at, is_ai, link_id")
            .in("link_id", linkIds)
            .order("created_at", { ascending: false });

        if (commentError) {
            console.error("❌ 댓글 조회 실패:", commentError.message);
            toast.error("댓글을 불러오는 중 문제가 발생했어요.");
            throw new Error(commentError.message);
        }

        // 3️⃣ session_order 기준으로 그룹핑
        const linkMap = {};
        links.forEach(link => {
            linkMap[link.id] = link.session_order;
        });

        const grouped = {};
        comments.forEach(comment => {
            const session = linkMap[comment.link_id] || 1;
            if (!grouped[session]) grouped[session] = [];
            grouped[session].push(comment);
        });

        console.log("📦 세션별 댓글 그룹핑 완료:", grouped);
        return grouped;
    } catch (err) {
        console.error("댓글 세션별 불러오기 중 예외:", err.message);
        toast.error("알 수 없는 오류로 댓글을 불러오지 못했어요.");
        throw err;
    }
};
