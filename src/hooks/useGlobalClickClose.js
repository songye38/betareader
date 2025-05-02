// hooks/useGlobalClickClose.js
import { useEffect, useRef } from 'react';

export default function useGlobalClickClose(isOpen, onClose) {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // 모달 바깥 클릭하면 닫기
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose]);

  return modalRef; // ⭐ ref를 반환
}
