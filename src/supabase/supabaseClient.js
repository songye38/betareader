// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase 클라이언트 인스턴스 생성
// ✅ 세션 저장 및 토큰 자동 갱신 명시적으로 설정
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,    // ➕ 세션 자동 저장
      autoRefreshToken: true,  // ➕ 토큰 자동 갱신
      detectSessionInUrl: true // ➕ OAuth 리다이렉트 지원 (필요 시)
    },
  });
  

export default supabase; 