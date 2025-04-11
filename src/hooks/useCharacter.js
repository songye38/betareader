import { useState } from 'react';
import { createCharacter,getCharactersByManuscript } from '@/models/CharacterModel';

const useCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 아이디어 목록 불러오기
  const fetchCharacters = async (manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharactersByManuscript(manuscriptId);
      setCharacters(data);
    } catch (err) {
      setError(err.message || '캐릭터 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  // 아이디어 추가
  const addCharacter = async (character, manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const newCharacter = await createCharacter(character,  manuscriptId);
      setCharacters((prev) => [newCharacter, ...prev]); // 새로 추가한 아이디어 맨 앞에 넣기
    } catch (err) {
      setError(err.message || '아이디어 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  return {
    ideas,
    loading,
    error,
    fetchCharacters,
    addCharacter,
  };
};

export default useCharacter;
