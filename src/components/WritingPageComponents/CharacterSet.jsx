import React from 'react';
import CharacterItem from './CharacterItem';

const CharacterSet = () => {
  const dummy = {
    name: '이소연',
    role: '주인공',
    ageCategory: '20대 후반',
    age: '29',
    keywords: ['냉철함', '분석적', '이성적'],
    appearance: '긴 흑발에 날카로운 눈매\n평소 정장을 입고 다님',
    goal: '인공지능을 활용해 세상을 바꾸는 것',
  };

  return (
    <div style={{ padding: 20 }}>
      <CharacterItem character={dummy} />
    </div>
  );
};

export default CharacterSet;
