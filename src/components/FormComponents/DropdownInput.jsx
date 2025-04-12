'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

const dropdownOptionsMap = {
  "캐릭터": ["주인공", "조연", "적대자", "멘토", "트릭스터", "변화자"],
  "세계관": [
    "시공간",
    "사회 구조",
    "기술/마법 체계",
    "종족/생명체",
    "법칙/제한",
    "역사/신화",
    "문화/언어/관습",
    "경제/교류",
  ],
  "성별": ["여성", "남성", "기타"],
  "아이디어": ["설정", "캐릭터", "플롯", "디테일", "테마"],
};

const DropdownInput = ({ control, error, type ,name}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = dropdownOptionsMap[type] || [];

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <div style={{ width: '100%', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              padding: '1.5rem 1.25rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '12px',
              background: '#1E1F24',
              color: 'white',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ fontSize: '1rem', fontWeight: '500' }}>
              {value || `${type} 선택하기`}
            </span>
            <img
              src="/arrow_up_icon.svg"
              alt="arrow"
              width="16"
              height="16"
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                marginTop: '0.5rem',
                background: '#1E1F24',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
              }}
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => {
                    onChange(option); // 여기가 중요!
                    setIsOpen(false);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3A407A')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          {error && <div style={{ color: 'red', marginTop: 4 }}>필수 선택 항목입니다.</div>}
        </div>
      )}
    />
  );
};

export default DropdownInput;















// 'use client';

// import { useState } from 'react';

// const dropdownOptionsMap = {
//   "캐릭터": ["주인공", "조연", "적대자", "멘토", "트릭스터", "변화자"],
//   "세계관": [
//     "시공간",
//     "사회 구조",
//     "기술/마법 체계",
//     "종족/생명체",
//     "법칙/제한",
//     "역사/신화",
//     "문화/언어/관습",
//     "경제/교류",
//   ],
//   '성별': ["여성", "남성", "기타"],
//   "아이디어": ["설정", "캐릭터", "플롯", "디테일", "테마"],
// };

// const DropdownInput = ({ error, onDropdownChange, type }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(`${type} 선택하기`);
//   const [customInputValue, setCustomInputValue] = useState('');

//   const options = dropdownOptionsMap[type] || [];

//   const handleOptionSelect = (option) => {
//     setSelectedValue(option);
//     onDropdownChange(option);
//   };

//   return (
//     <div style={{ width: '100%', position: 'relative', display: 'inline-block', height: 'auto' }}>
//       <div
//         style={{
//           display: 'flex',
//           width: '100%',
//           height: '100%',
//           padding: '1.5rem 1.25rem',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderRadius: '12px',
//           background: '#1E1F24',
//           color: 'white',
//           cursor: 'pointer',
//           userSelect: 'none',
//         }}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span style={{ fontSize: '1rem', fontWeight: '500' }}>
//           {selectedValue === '직접 입력' ? customInputValue || '직접 입력' : selectedValue}
//         </span>
//         <img
//           src="/arrow_up_icon.svg"
//           alt="arrow"
//           width="16"
//           height="16"
//           style={{
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 0.3s ease-in-out',
//           }}
//         />
//       </div>

//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             marginTop: '0.5rem',
//             background: '#1E1F24',
//             borderRadius: '1.25rem',
//             overflow: 'hidden',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             zIndex: 10,
//           }}
//         >
//           {options.map((option, index) => (
//             <div
//               key={index}
//               style={{
//                 padding: '1rem',
//                 color: 'white',
//                 fontSize: '1rem',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s',
//               }}
//               onClick={() => handleOptionSelect(option)}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3A407A')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownInput;