import { create } from "zustand";

// 전체 manuscript 상태를 관리하는 store
const useManuscriptStore = create((set) => ({
  manuscript: {
    id: null, // 원고집의 id만 관리
  },

  // manuscript 객체를 업데이트하는 함수 (id만 갱신)
  setManuscript: (data) => set({
    manuscript: { id: data.id }, // id만 업데이트
  }),

  // manuscript 초기화
  resetManuscript: () => set({
    manuscript: { id: null },
  }),
}));

// 세션 스토리지에 상태 저장하기
if (typeof window !== 'undefined') {
  // manuscript 상태가 변경될 때마다 세션 스토리지에 저장
  useManuscriptStore.subscribe(
    (state) => {
      sessionStorage.setItem("manuscript", JSON.stringify(state.manuscript));
    },
    (state) => state.manuscript // manuscript 상태를 감지하여 저장
  );

  // 세션 스토리지에서 manuscript 불러오기
  const loadManuscriptFromSessionStorage = () => {
    const manuscript = sessionStorage.getItem("manuscript");
    return manuscript ? JSON.parse(manuscript) : { id: null };
  };

  // 초기 상태 설정 (세션 스토리지에서 불러오기)
  const manuscript = loadManuscriptFromSessionStorage();

  // 세션 스토리지에서 불러온 manuscript로 상태 초기화
  useManuscriptStore.setState({
    manuscript: manuscript,
  });
}

export default useManuscriptStore;
