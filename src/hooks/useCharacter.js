import { useState } from 'react';
import { createCharacter, getCharactersByManuscript, deleteCharacterById, getCharacterByManuscript, updateCharacter } from '@/models/CharacterModel';
import { useForm } from 'react-hook-form';
import { getCharacterTypeKo, getGenderTypeKo } from '@/utils/typeMappings';

const useCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const methods = useForm({
    defaultValues: {
      name: '',
      age: '',
      appearance: '',
      character_type: '',
      gender: '',
      goal: '',
      newKeywords: [],
      backstory: '',
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, formState: { errors }, watch, setValue, getValues } = methods;

  const handleKeywordChange = (updatedKeywords) => {
    console.log("handleKeywordChange 호출됨");


    setValue('newKeywords', updatedKeywords);

    // watch로 최신 상태 가져오기
    console.log("키워드 업데이트:", watch("newKeywords"));
  }


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

  const fetchCharacter = async (id, manuscriptId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCharacterByManuscript(id, manuscriptId);

      console.log("받아오는 data는", data);
      setCharacter(data);

      methods.reset({
        name: data.name || '',
        character_type: getCharacterTypeKo(data.role) || '',
        gender: getGenderTypeKo(data.gender) || '',
        age: data.age || '',
        backstory: data.backstory || '',
        appearance: data.appearance || '',
        newKeywords: data.personality || [],
        goal: data.goal || '',
      });
    } catch (err) {
      setError(err.message || '캐릭터 정보 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  // 아이디어 추가
  const addCharacter = async (character, manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const newCharacter = await createCharacter(character, manuscriptId);
      setCharacters((prev) => [newCharacter, ...prev]); // 새로 추가한 아이디어 맨 앞에 넣기
    } catch (err) {
      setError(err.message || '아이디어 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const deleteCharacter = async (id) => {
    console.log("이 함수가 호출되긴 하나?");
    setLoading(true);
    setError(null);
    try {
      await deleteCharacterById(id);
      setCharacters((prev) => prev.filter((cha) => cha.id !== id)); // 삭제된 항목 제외
    } catch (err) {
      setError(err.message || '캐릭터 삭제 실패');
    } finally {
      setLoading(false);
    }
  };

  const editCharacter = async (updatedCharacter, characterId, manuscriptId) => {
    setLoading(true);
    setError(null);
    try {
      const newData = await updateCharacter(updatedCharacter, characterId, manuscriptId);
      setCharacters((prev) =>
        prev.map((item) => (item.id === characterId ? newData : item))
      );
      setCharacter(newData); // 캐릭터 상세보기 등 상태 갱신용
    } catch (err) {
      setError(err.message || '캐릭터 수정 실패');
    } finally {
      setLoading(false);
    }
  };




  return {
    editCharacter,
    character,
    fetchCharacter,
    deleteCharacter,
    characters,
    methods,
    control,
    errors,
    handleSubmit,
    watch,
    setValue,
    getValues,
    loading,
    error,
    handleKeywordChange,
    fetchCharacters,
    addCharacter,
  };
};

export default useCharacter;
