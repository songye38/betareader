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


  function sanitizeFileName(name) {
    return name
      .replace(/\s+/g, '-')           // 공백 → 하이픈
      .replace(/[^\w.-]/g, '')        // 특수문자 제거 (한글 포함)
      .toLowerCase();
  }

  // 이미지 업로드 및 URL 저장 함수
export async function uploadProfileImage(userId, file) {
    // 파일 이름을 유니크하게 지정 (예: user123.png)

    const safeFileName = sanitizeFileName(file.name);
    const filePath = `${userId}/${safeFileName}`;
  
    // 1. Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-image') // 📦 너가 만든 storage 버킷 이름
      .upload(filePath, file, {
        upsert: true,
      });
  
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }
  
  
    // 2. profile 테이블에 이미지 URL 저장
    const { data, error } = await supabase
      .from('profile')
      .update({ avatar_url: filePath }) // ✅ avatar_url 필드에 저장
      .eq('user_id', userId)
      .select()
      .single();
  
    if (error) {
      console.error('Error updating avatar URL:', error);
      throw error;
    }
  
    return data;
  }
  