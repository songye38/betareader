export function getAgeGroup(ageCategory) {
  switch (ageCategory) {
    case "전체이용가": return "GENERAL_AUDIENCE";
    case "15세이상이용가": return "FIFTEEN_ABOVE";
    case "19세이상이용가": return "NINETEEN_ABOVE";
    default: return "UNKNOWN";
  }
}

export const getAgeCategoryDisplay = (ageCategoryEnum) => {
  switch (ageCategoryEnum) {
    case "GENERAL_AUDIENCE": return "전체이용가";
    case "FIFTEEN_ABOVE": return "15세이상이용가";
    case "NINETEEN_ABOVE": return "19세이상이용가";
    default: return "전체이용가";  // 기본값
  }
};


export function getGenreType(genre) {
  switch (genre) {
    case "로맨스": return "ROMANCE";
    case "BL": return "BL";
    case "로맨스 판타지": return "ROMANCE_FANTASY";
    case "GL": return "GL";
    case "판타지": return "FANTASY";
    case "공포": return "HORROR";
    case "현대 판타지": return "MODERN_FANTASY";
    case "추리": return "MYSTERY";
    case "무협": return "MARTIAL_ARTS";
    case "드라마": return "DRAMA";
    default: return "UNKNOWN";
  }
}

export function getGenreDisplay(genreEnum) {
  switch (genreEnum) {
    case "ROMANCE": return "로맨스";
    case "BL": return "BL";
    case "ROMANCE_FANTASY": return "로맨스 판타지";
    case "GL": return "GL";
    case "FANTASY": return "판타지";
    case "HORROR": return "공포";
    case "MODERN_FANTASY": return "현대 판타지";
    case "MYSTERY": return "추리";
    case "MARTIAL_ARTS": return "무협";
    case "DRAMA": return "드라마";
    default: return "알 수 없음";  // 기본값 처리
  }
}


export function getCharacterType(character) {
  switch (character) {
    case "주연": return "PROTAGONIST";
    case "조연": return "SECONDARY";
    default: return "UNKNOWN";
  }
}

export function getCharacterTypeDisplay(characterType) {
  switch (characterType) {
    case "PROTAGONIST": return "주연";
    case "SECONDARY": return "조연";
    default: return "UNKNOWN";  // 기본값
  }
}

export function transformManuscriptSettingData(data) {
  return {
    manuscript_id: data.manuscript_id, // manuscript_id 필요
    title: data.title,
    plot: data.plot,
    genre: getGenreType(data.genre),
    age_group: getAgeGroup(data.ageCategory),
    keywords: data.newKeywords,  // text[]로 저장
    characters: data.characters.map((character) => ({
      name: character.name,
      role: getCharacterType(character.role),
      description: character.description,
    })), // jsonb로 저장
  };
}

