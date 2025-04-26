import AddIdeaBtn from '../Buttons/AddIdeaBtn';
import AddCharacterBtn from '../Buttons/AddCharacterBtn';
import AddEnvironmentBtn from '../Buttons/AddEnvironmentBtn';


const MainBtnSet = () => {

  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#1E1F24',
        borderRadius: '32px',
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '33.60px',
          wordWrap: 'break-word',
        }}
      >
        원고집 설정
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
        {/* AddEpiBtn도 동일한 1/4 비율로 감싸줌 */}
        <div style={{ flex: '1 1 calc(25% - 18px)' }}>
          <AddIdeaBtn />
        </div>
        <div style={{ flex: '1 1 calc(25% - 18px)' }}>
          <AddCharacterBtn />
        </div>
        <div style={{ flex: '1 1 calc(25% - 18px)' }}>
          <AddEnvironmentBtn />
        </div>

      </div>




    </div>
  );
};

export default MainBtnSet;
