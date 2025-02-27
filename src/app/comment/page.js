import CommentComponent from "@/components/CommentComponent";

const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // 수직 방향으로 정렬
        justifyContent: "center", // 세로 방향으로 중앙 정렬
        alignItems: "center", // 가로 방향으로 중앙 정렬
        gap : '15px',
      }}
    >
      <CommentComponent />
      <CommentComponent />
      <CommentComponent />
      <CommentComponent />
    </div>
  );
};

export default MainPage;
