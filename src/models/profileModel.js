import supabase from '../supabase/supabaseClient';

// profile 테이블에 user_id 기준으로 goals 업데이트
export async function updateProfileGoals(userId, newGoals) {
  const { data, error } = await supabase
    .from('profile')
    .update({ goals: newGoals }) // newGoals는 문자열, 배열, JSON 등 DB 타입에 따라 맞춰줘야 함
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating goals:', error);
    throw error;
  }

  return data;
}

// ✅ profile 테이블에서 user_id 기준으로 goals 가져오기
export async function getProfileGoals(userId) {
    const { data, error } = await supabase
      .from('profile')
      .select('goals')
      .eq('user_id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  
    return data.goals; // 배열 형태로 반환
  }

  export async function updateProfileUsername(userId, newUsername) {
    const { data, error } = await supabase
      .from('profile')
      .update({ username: newUsername }) // username 컬럼 업데이트
      .eq('user_id', userId)
      .select()
      .single();
  
    if (error) {
      console.error('Error updating username:', error);
      throw error;
    }
  
    return data;
  }