import React, { useState ,useEffect} from 'react';
import { toast } from 'react-toastify';
import { useFeedback } from '@/hooks/useFeedback';


const CommentInputSection = ({createdAt,linkId }) => {
  const { saveCommentToServer } = useFeedback();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // 댓글 입력란이 열려있는지 여부
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const updateRemainingTime = () => {
      const createdTime = new Date(createdAt);
      const now = new Date();
      const totalMs = 24 * 60 * 60 * 1000;
      const elapsedMs = now - createdTime;
      const remainingMs = totalMs - elapsedMs;

      if (remainingMs <= 0) {
        setRemaining('00:00:00');
        return;
      }

      const hours = String(Math.floor(remainingMs / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((remainingMs % (1000 * 60)) / 1000)).padStart(2, '0');

      setRemaining(`${hours}:${minutes}:${seconds}`);
    };

    updateRemainingTime(); // 초기값 바로 계산

    const interval = setInterval(updateRemainingTime, 1000); // 매 초마다 업데이트
    return () => clearInterval(interval); // 언마운트 시 정리
  }, [createdAt]);

  const handleSubmit = async () => {
    if(!linkId) {
        return;
    }
    if (password.length < 4) {
       toast.error('비밀번호는 최소 4자 이상이어야 해요.');
      return;
    }

    if (text.trim().length === 0) {
      toast.error('댓글을 입력해주세요!');
      return;
    }

    try {
      const result = await saveCommentToServer({
        linkId,
        content: text.trim(),
        password,
        name: name.trim() === '' ? '익명' : name.trim(),
      });

      if (result) {
        // toast.success('댓글이 성공적으로 등록되었어요!');
        setName('');
        setPassword('');
        setText('');
      }
    } catch (err) {
       toast.error('댓글 제출 중 문제가 발생했어요.');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1E1F24',
        borderRadius: 12,
        padding: '40px 40px',
        color: 'white',
        fontFamily: 'Pretendard',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'flex-end',
      }}
    >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',flexDirection:'row' }}>
        {/* 만약 만료되지 않았다면 생성 시간도 표시하거나 추가 로직을 넣을 수 있음 */}
        <div style={{ textAlign: 'center',fontWeight:'600' ,fontSize: '14px',padding:'12px',border:'1px solid #8A94FF',borderRadius:'8px',backgroundColor:'#2A2B31'}}>
          ⏰ 남은 시간: {remaining}
        </div>

        <div style={{ fontSize: '20px', fontWeight: '700' ,height:'100%'}}>댓글 작성하기</div>
        
        {/* 화살표 버튼 */}
        <div style={{ textAlign: 'right' }}>
            <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#8A94FF',
                cursor: 'pointer',
                fontSize: '24px',
            }}
            >
            {/* SVG 아이콘을 사용 */}
            <img
                src={isOpen ? '/arrow_up_icon.svg' : '/arrow_icon.svg'}
                alt="Arrow Icon"
                style={{ width: '32px', height: '32px' }} // 적당한 크기 조정
            />
            </button>
        </div>
    </div>

      

      {/* 댓글 입력란 섹션 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          overflow: 'hidden',
          transition: 'height 0.3s ease', // 부드러운 높이 변경 애니메이션
          height: isOpen ? 'auto' : 0, // 열릴 때는 자동, 닫힐 때는 0으로 설정
        }}
      >
        {/* 이름 + 비밀번호 (세로 정렬) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 160 }}>
          <LabelInput label="이름" required={false}>
            <input
              type="text"
              placeholder="이름 (선택)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </LabelInput>

          <LabelInput label="비밀번호" required={true}>
            <input
              type="password"
              placeholder="비밀번호 (필수)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </LabelInput>
        </div>

        {/* 댓글 입력란 */}
        <div style={{ flex: 1 }}>
          <LabelInput label="댓글" required={true}>
            <textarea
              placeholder="댓글을 입력해주세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: 'none', height: '100%' }}
            />
          </LabelInput>
        </div>

        {/* 등록 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#8A94FF',
              color: 'white',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'default' : 'pointer',
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            {loading ? '제출 중...' : '댓글 등록'}
          </button>
        </div>
      </div>
    </div>
  );
};

const LabelInput = ({ label, required = false, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
      <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
      {required && <span style={{ color: '#8A94FF', fontWeight: 600 }}>*</span>}
    </div>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  backgroundColor: '#2A2B31',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 12px',
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Pretendard',
  outline: 'none',
};

export default CommentInputSection;
