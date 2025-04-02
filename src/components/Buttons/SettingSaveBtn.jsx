const SettingSaveBtn = ({ disabled }) => {
  return (
    <button
      type="submit" // ✅ 폼 제출을 트리거
      disabled={disabled}
      style={{
        width: 368,
        height: 62,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        background: disabled ? '#2F3138' : '#5E6CFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none', // ✅ 버튼 기본 스타일 제거
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: disabled ? '#7B8091' : 'white',
          fontSize: 24,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        입력 내용 수정
      </div>
    </button>
  );
};
export default SettingSaveBtn;