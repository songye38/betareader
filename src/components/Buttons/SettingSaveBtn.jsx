const SettingSaveBtn = ({ disabled }) => {
  return (
    <button
      type="submit" 
      disabled={disabled}
      style={{
        width: 368,
        height: 62,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        background: disabled ? '#2F3138' : '#A78EF7',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none', 
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