import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { supabase } from "./lib/supabase";

// 디버깅을 위해 전역에서 supabase 접근 가능하도록 설정
if (typeof window !== 'undefined') {
  (window as any).supabase = supabase;
}

// // stagewise 툴바 설정
// import { initToolbar } from '@stagewise/toolbar';

// const stagewiseConfig = {
//   plugins: [],
// };

// // 개발 모드에서만 stagewise 툴바 초기화
// function setupStagewise() {
//   if (import.meta.env.DEV) {
//     initToolbar(stagewiseConfig);
//   }
// }

// // stagewise 설정 실행
// setupStagewise();

createRoot(document.getElementById("root")!).render(<App />);
