import React from 'react';

const MAIN_PURPLE = '#8B5CF6';

const ContentInput = () => {
  const defaultText = `
그날 나는 정말 행복했다. 하늘이 맑았다. 친구들과 많은 이야기를 나눴다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다. 환경권의 내용과 행사에 관하여는 법률로 정한다. 헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다.

국회에서 의결된 법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다. 법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 모든 국민은 헌법과 법률이 정한 법관에 의하여 법률에 의한 재판을 받을 권리를 가진다.

모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를 가진다. 선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되, 균등한 기회가 보장되어야 한다.

이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.

누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될 기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다.

대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다.

제1항의 지시를 받은 당해 행정기관은 이에 응하여야 한다. 제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다.

국민의 자유와 권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다. 저녁노을이 아름다웠다. 우리는 잊지 못할 하루를 보냈다.
`;

  // 문장 또는 문단 단위의 하이라이트 (향후 AI가 줄 영역 정보라고 가정)
  const highlightBlocks = [
    '하늘이 맑았다. 친구들과 많은 이야기를 나눴다.',
    '저녁노을이 아름다웠다. 우리는 잊지 못할 하루를 보냈다.',
    '누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될 기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다.'
  ];

  const highlightText = (text, targets) => {
    let parts = [text];

    targets.forEach((target) => {
      const newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const split = part.split(target);
          split.forEach((seg, i) => {
            newParts.push(seg);
            if (i < split.length - 1) {
              newParts.push(
                <span
                  key={`${target}-${i}-${seg}`}
                  style={{
                    backgroundColor: MAIN_PURPLE,
                    borderRadius: '8px',
                    padding: '4px 8px',
                    margin: '0 4px',
                    display: 'inline-block',
                    fontWeight: 500,
                    color: '#fff',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {target}
                </span>
              );
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div
      style={{
        width : '80%',
        // backgroundColor: '#1F1F24',
        color: 'white',
        padding: '24px',
        borderRadius: '12px',
        fontSize: '16px',
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
        fontFamily: 'Pretendard',
      }}
    >
      {highlightText(defaultText, highlightBlocks)}
    </div>
  );
};

export default ContentInput;
