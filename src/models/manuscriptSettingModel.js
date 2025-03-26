export function getAgeGroup(ageCategory) {
    switch (ageCategory) {
      case "전체이용가": return "GENERAL_AUDIENCE";
      case "15세이상이용가": return "FIFTEEN_ABOVE";
      case "19세이상이용가": return "NINETEEN_ABOVE";
      default: return "UNKNOWN";
    }
  }
  
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
  
  export function getCharacterType(character) {
    switch (character) {
      case "주연": return "PROTAGONIST";
      case "조연": return "SECONDARY";
      default: return "UNKNOWN";
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
  
