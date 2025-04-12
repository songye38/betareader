/** @type {import('next').NextConfig} */
const nextConfig = {};


export default nextConfig;

///** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       runtime: 'nodejs', // 기본 런타임 명시적으로 고정
//       serverComponentsExternalPackages: ['@supabase/supabase-js'],
//     },
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.fallback = {
//           fs: false,
//           net: false,
//           tls: false,
//           module: false,
//           console: false,
//           'worker_threads': false,
//           'async_hooks': false,
//           'perf_hooks': false,
//         };
//       }
//       return config;
//     },
//   };
  
//   export default nextConfig;
  
