const WritingFloatingBtn = ({ title, isActive, onClick }) => {
    return (
      <div
        onClick={onClick}
        style={{
          padding: '6px 12px',
          background: isActive ? 'black' : '#F5F5F5',
          borderRadius: 4,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: isActive ? 'white' : 'black',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: '600',
            wordWrap: 'break-word',
          }}
        >
          {title}
        </div>
      </div>
    );
  };
  
  export default WritingFloatingBtn;
  