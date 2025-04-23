import { useState } from 'react';
import { checkAndUpdateExpiredStatus,saveComment,fetchComments,createCommentLink ,fetchLinkInfo} from '@/models/feedbackModel'; // 같은 곳에 있다고 가정
import { toast } from "react-toastify";
import { useCallback } from 'react';

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [info, setInfo] = useState(null);

/**
 * 댓글 링크 생성 함수
 * @param {number} episodeId - 에피소드 ID
 * @param {UUID} userId - 사용자 ID
 * @param {number} minRequiredComments - 최소 피드백 개수 (5, 10, 15, 20 중 하나)
 * @returns {Promise<object>} - 생성된 댓글 링크 row
 */
  const addCommentLink = async (episodeId, minRequiredComments,userId) => {
    setLoading(true);
    setError(null);
    try {
      const newLink = await createCommentLink(episodeId, minRequiredComments,userId);
      return newLink;
    } catch (err) {
      setError(err.message || '댓글 링크 생성 실패');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 댓글 링크 만료 여부 확인 및 업데이트
   * @param {string} linkId - 댓글 링크 UUID
   * @returns {Promise<boolean>} - true: 만료됨 / false: 유효함
   */
const checkExpired = async (linkId) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log("1. checkExpired 호출됨, linkId:", linkId); // 1. linkId가 정상인지
      console.log("1.5 checkAndUpdateExpiredStatus 호출 직전");
  
      const result = await checkAndUpdateExpiredStatus(linkId);
  
      // `checkAndUpdateExpiredStatus`에서 반환된 값이 null 또는 undefined일 수 있으므로 이를 확인
      if (!result) {
        console.error("checkAndUpdateExpiredStatus에서 반환된 값이 없습니다.");
        return { expired: true }; // 예상치 못한 상황
      }
  
      console.log("2. checkExpired → result:", result); // 2. 응답 구조 확인
  
      return result;
  
    } catch (err) {
      console.error("checkExpired 에러:", err); // 3. 예외 로그
      setError(err.message || "링크 만료 확인 실패");
      return { expired: true };
    } finally {
      setLoading(false);
    }
  };

/**
 * 댓글 등록
 * @param {{ linkId: string, content: string, password: string, name: string | undefined }} commentData - 댓글 데이터
 * @returns {Promise<object|null>} 저장된 댓글 객체 또는 null
 */
const saveCommentToServer = async (commentData) => {
    setLoading(true);
    setError(null);

    try {
        const savedComment = await saveComment(commentData);
        return savedComment;
    } catch (err) {
        console.error("addComment 에러:", err);
        setError(err.message || "댓글 저장 실패");
        toast.error("댓글 저장 중 오류가 발생했어요.");
        return null;
    } finally {
        setLoading(false);
    }
};
  


const loadCommentsFromServer = async (linkId) => {
    if (!linkId) return;

    setLoading(true);
    setError(null);

    try {
        const fetched = await fetchComments(linkId);
        setComments(fetched || []);
    } catch (err) {
        console.error("💥 댓글 로드 실패:", err.message);
        setError(err.message || "댓글 불러오기 실패");
        toast.error("댓글을 불러오는 중 오류가 발생했어요.");
    } finally {
        setLoading(false);
    }
};

const loadInfoFromServer = useCallback(async (linkId) => {
    if (!linkId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchLinkInfo(linkId);
      setInfo(data || null);
    } catch (err) {
      console.error("❌ 링크 정보 로드 실패:", err.message);
      setError(err.message || "링크 정보를 불러올 수 없습니다.");
      toast.error("링크 정보를 가져오는 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  }, []);

  

return {
    addCommentLink,
    checkExpired,
    loading,
    error,
    saveCommentToServer,
    loadCommentsFromServer,
    comments,
    loadInfoFromServer,
    info
    };
};
