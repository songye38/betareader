export function getIdeaType(ideaType) {
    switch (ideaType) {
      case "캐릭터": return "Character";
      case "설정": return "Setting";
      case "플롯": return "Plot";
      case "디테일": return "Detail";
      case "테마": return "Theme";
      default: return "Character";
    }
  }

  export function getIdeaTypeKo(type) {
    switch (type) {
      case "Character": return "캐릭터";
      case "Setting": return "설정";
      case "Plot": return "플롯";
      case "Detail": return "디테일";
      case "Theme": return "테마";
      default: return "캐릭터";
    }
  }

  export function getCharacterTypeKo(type) {
    switch (type) {
      case "Protagonist": return "주인공";
      case "Supporting": return "조연";
      case "Antagonist": return "적대자";
      case "Mentor": return "멘토";
      case "Trickster": return "트릭스터";
      case "Shapeshifter": return "변화자";
      default: return "주인공";
    }
  }

  export function getCharacterType(character) {
    switch (character) {
      case "주인공": return "Protagonist";
      case "조연": return "Supporting";
      case "적대자": return "Antagonist";
      case "멘토": return "Mentor";
      case "트릭스터": return "Trickster";
      case "변화자": return "Shapeshifter";
      default: return "Protagonist";
    }
  }

  export function getGenderType(gender) {
    switch (gender) {
      case "여성": return "female";
      case "남성": return "male";
      case "기타": return "etc";
      default: return "female";
    }
  }

  export function getGenderTypeKo(type) {
    switch (type) {
      case "female": return "여성";
      case "male": return "남성";
      case "etc": return "기타";
      default: return "여성";
    }
  }

  export function getEnvironmentType(environment) {
    switch (environment) {
      case "시공간": return "TimeSpace";
      case "사회 구조": return "SocialStructure";
      case "기술/마법 체계": return "TechMagicSystem";
      case "종족/생명체": return "SpeciesCreatures";
      case "법칙/제한": return "RulesConstraints";
      case "역사/신화": return "HistoryMythology";
      case "문화/언어/관습": return "CultureLanguageCustoms";
      case "경제/교류": return "EconomyExchange";
      default: return "TimeSpace";
    }
  }


  export function getEnvironmentTypeKo(type) {
    switch (type) {
      case "TimeSpace": return "시공간";
      case "SocialStructure": return "사회 구조";
      case "TechMagicSystem": return "기술/마법 체계";
      case "SpeciesCreatures": return "종족/생명체";
      case "RulesConstraints": return "법칙/제한";
      case "HistoryMythology": return "역사/신화";
      case "CultureLanguageCustoms": return "문화/언어/관습";
      case "EconomyExchange": return "경제/교류";
      default: return "시공간";
    }
  }
  
  