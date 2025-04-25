const SettingTab = ({ selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        width: '13.75rem',
        borderRadius: '0.75rem',
        height: '2.25rem',
        padding: '0.5rem 0.8125rem',
        alignItems: 'center',
        gap: '0.625rem',
        background: selected
          ? 'var(--neutral-700, #D9DCFF)' // 선택된 탭의 배경색
          : 'var(--neutral-800, #1E1F24)', // 기본 배경색
        cursor: 'pointer',
      }}
    >
      {/* 텍스트 */}
      <div
        style={{
          color: '#4351D9',
          fontSize: '14px',
          fontFamily: 'Pretendard',
          fontWeight: '500',
          lineHeight: '19.6px',
          wordWrap: 'break-word',
        }}
      >
        설정집
      </div>
    </div>
  );
};

export default SettingTab;
