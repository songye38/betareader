// pages/_app.js
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/NavBar"; // NavBar 컴포넌트 import
import { ToastContainer, Bounce } from 'react-toastify'; // ToastContainer 및 Bounce import
import "./globals.css"; // 전역 스타일

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
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${poppins.className}`}>
      <Navbar /> {/* 상단 바 추가 */}
      <Component {...pageProps} /> {/* 페이지별 내용 렌더링 */}
      <ToastContainer 
        position="top-right"
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
