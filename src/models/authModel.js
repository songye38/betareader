import supabase from '../supabase/supabaseClient';

// 일반 이메일 로그인
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

// OAuth 로그인 (카카오)
export const signInWithOAuth = async (provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
};

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// 회원가입 (이메일 + 닉네임)
export const signUpWithEmail = async (email, password, nickname) => {
  try {
    // Supabase에 사용자 추가 요청
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    // authError가 있는지 확인
    if (authError) {
      console.error('회원가입 에러:', authError);
      throw new Error(authError.message);
    }

    // data.user에서 user 정보 가져오기
    const user = data?.user;
    if (!user) {
      console.error('회원가입 후 반환된 user 객체가 없습니다.');
      throw new Error('회원가입에 실패했습니다. 사용자 정보를 가져올 수 없습니다.');
    }

    console.log('회원가입 성공, user:', user); // user 객체 출력

    // user 객체를 로컬 변수에 할당
    const userId = user.id;  // ⚠️ 'UID'가 아니라 'id'임
    console.log('userId:', userId); // userId 출력

    // 추가로 'profile' 테이블에 닉네임 저장
    const { data: profileData, error: dbError } = await supabase
      .from('profile')  // 'profile' 테이블에 접근
      .upsert({
        user_id: userId,  // 'users' 테이블의 user_id
        username: nickname, // 프로필에 저장할 닉네임
      })
      .single();  // 하나의 레코드만 반환되도록 설정

    if (dbError) {
      console.error('프로필 저장 에러:', dbError);
      throw new Error(dbError.message);
    }

    console.log('프로필 저장 성공:', profileData); // 저장된 프로필 데이터 출력

    // 정상적으로 처리되었을 경우 반환된 데이터
    return profileData; // `profileData`는 upsert된 사용자 정보를 포함할 것임
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;  // 상위 함수로 오류를 전달
  }
};
