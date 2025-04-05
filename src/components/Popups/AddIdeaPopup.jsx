'use client';
import { useState } from 'react';

const AddIdeaPopup = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['소설', '에세이', '시', 'SF', '판타지'];

  const handleSubmit = () => {
    if (!title || !selectedCategory) {
      alert('제목과 카테고리를 입력해주세요.');
      return;
    }

    const newIdea = {
      title,
      category: selectedCategory,
      description: '',
      tags: [],
    };

    onSubmit?.(newIdea);
    onClose?.();
  };

  return (
    <div
      style={{
        width: 446,
        height: 'auto',
        padding: 36,
        background: '#2C2D34',
        borderRadius: 24,
        border: '1px #4A4E5B solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        display: 'inline-flex',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '600',
          }}
        >
          아이디어 추가
        </div>

        <img
          src="/close_icon.svg"
          alt="Close"
          width={24}
          height={24}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* 카테고리 선택 */}
      <div style={{ width: '100%', borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: '100%',
            height: '48px',
            padding: '8px',
            color: 'white',
            fontSize: '18px',
            fontFamily: 'Pretendard',
            background: '#2C2D34',
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>
            카테고리를 선택해주세요
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category} style={{ background: '#1E1F24' }}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* 제목 입력 */}
      <div
        style={{
          width: '100%',
          padding: '24px 28px',
          background: '#1E1F24',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Pretendard',
            }}
          >
            제목
          </span>
          <span
            style={{
              color: '#8A94FF',
              fontSize: 24,
              fontWeight: '700',
              marginLeft: 4,
            }}
          >
            *
          </span>
        </div>

        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '10px',
            color: 'white',
            fontSize: '20px',
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
          }}
        />
      </div>

      {/* 추가 버튼 */}
      <button
        onClick={handleSubmit}
        style={{
          padding: '12px 24px',
          backgroundColor: '#8A94FF',
          color: 'white',
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'Pretendard',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
        }}
      >
        아이디어 추가하기
      </button>
    </div>
  );
};

export default AddIdeaPopup;
