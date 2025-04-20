// pages/_app.js
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Navbar from "@/components/NavBar"; // NavBar 컴포넌트 import
import { ToastContainer, Bounce } from 'react-toastify'; // ToastContainer 및 Bounce import
import "./globals.css"; // 전역 스타일
import AuthListener from "@/components/AuthListener";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarPages = ['/test', '/manu','/feedback'];

const shouldHideNavbar = hideNavbarPages.some((path) =>
  router.pathname.startsWith(path)
);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${poppins.className}`}>
      <AuthListener /> {/* ✅ 로그인 상태 감지 및 Zustand 업데이트 */}
      {/* <Navbar />  */}

      {!shouldHideNavbar && <Navbar />}
      <Component {...pageProps} /> {/* 페이지별 내용 렌더링 */}
      <ToastContainer 
        position="top-right"
        theme = 'dark'
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Bounce}
      />
    </div>
  );
}
