// pages/api/withdraw.js
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // 🔥 프로필 테이블에서 is_deleted = true, deleted_at = 현재시간 업데이트
    const { error } = await supabaseAdmin
      .from('profile')
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('회원 탈퇴 업데이트 실패:', error.message);
      return res.status(500).json({ message: '탈퇴 실패', error: error.message });
    }

    return res.status(200).json({ message: '탈퇴 성공' });
  } catch (error) {
    console.error('서버 에러:', error);
    return res.status(500).json({ message: '서버 에러' });
  }
}
