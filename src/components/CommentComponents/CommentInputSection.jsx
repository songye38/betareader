import React, { useState ,useEffect} from 'react';
import { toast } from 'react-toastify';
import { useFeedback } from '@/hooks/useFeedback';


const CommentInputSection = ({linkId,onCommentAdded }) => {
  const { saveCommentToServer } = useFeedback();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);


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
        if (onCommentAdded) onCommentAdded();
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
        width : '80%',
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
    </div>

      

      {/* 댓글 입력란 섹션 */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
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
