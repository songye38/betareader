import useManuscripts from "@/hooks/useManuscripts";
import MyManuItem from "@/components/MyPage/MyManuItem";

const Manus = () => {
    const { manuscripts, loading, error,deleteManuscript } = useManuscripts();
  
    if (loading) {
      return <div style={{ color: 'white', marginTop: '60px', textAlign: 'center' }}>불러오는 중...</div>;
    }
  
    if (error) {
      return <div style={{ color: 'red', marginTop: '60px', textAlign: 'center' }}>에러 발생: {error}</div>;
    }
  
    const isEmpty = !Array.isArray(manuscripts) || manuscripts.length === 0;

    
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
        {/* 헤더 */}
        <div style={{
          width: '100%',
          height: 69,
          position: 'relative',
          padding: '0 242px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '100%',
            height: 2,
            backgroundColor: '#4A4E5B',
            position: 'absolute',
            top: '100%'
          }}></div>
  
          <div style={{
            width: '956px',
            color: 'white',
            fontSize: 24,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            lineHeight: '33.60px',
            textAlign: 'left'
          }}>
            연재물 설정
          </div>
        </div>
  
        {/* 연재물이 없는 경우 */}
        {isEmpty ? (
          <div style={{ color: 'gray', fontSize: '18px', fontFamily: 'Pretendard' }}>
            아직 작성한 연재물이 없어요.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: 'column', gap: '24px' }}>
            {manuscripts.map((item) => (
              <MyManuItem
                
                key={item.id}
                id = {item.id}
                title={item.title}
                num={item.episode_count}
                day={item.last_edited_at}
                onDelete={() => deleteManuscript(item.id)} // item.id를 넘겨줍니다.
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  

export default Manus;
