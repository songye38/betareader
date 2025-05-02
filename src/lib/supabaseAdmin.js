// lib/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 인스턴스 생성 (Admin 권한을 가진 키 사용)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // Supabase 프로젝트 URL
  process.env.SUPABASE_SERVICE_ROLE_KEY // Supabase Service Role Key (관리자 권한)
);

export { supabaseAdmin };
