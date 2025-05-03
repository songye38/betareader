import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isBrowser = typeof window !== 'undefined'; // 클라이언트 사이드인지 확인

// Supabase 클라이언트 인스턴스 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,       // 세션 자동 저장
    autoRefreshToken: true,     // 토큰 자동 갱신
    detectSessionInUrl: true,   // OAuth 리다이렉트 지원
    storageKey: 'supabase.auth.token',
    storage: isBrowser ? localStorage : undefined, // 클라이언트에서만 localStorage 사용
  }
});

export default supabase;
