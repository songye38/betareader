import React from 'react';
import dayjs from 'dayjs'; // dayjs 라이브러리 가져오기
import relativeTime from 'dayjs/plugin/relativeTime'; // 상대 시간 플러그인
import 'dayjs/locale/ko'; // 한국어 로케일 가져오기
import EditManuTitlePopup from '../Popups/EditManuTitlePopup';
import { useState } from 'react';

// dayjs에 상대 시간 플러그인 사용
dayjs.extend(relativeTime);

// dayjs에 한국어 로케일 설정
dayjs.locale('ko');

const MyManuItem = ({ id, title, day, num, onDelete }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);


  const relativeTimeDisplay = dayjs(day).fromNow();
  return (
    <div style={{
      width: 956, height: 146, paddingLeft: 28, paddingRight: 28, paddingTop: 24, paddingBottom: 24,
      background: '#2C2D34', borderRadius: 20, overflow: 'hidden', border: '1px #4A4E5B solid',
      justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'
    }}>
      {showEditPopup && (
        <EditManuTitlePopup
          title={title}
          manuscriptId={id}
          onClose={() => setShowEditPopup(false)} // 닫기 핸들러
        />
      )}
      <div style={{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12, display: 'inline-flex'
      }}>
        <img src="/book_icon.svg" alt="Profile" width={24} height={24} />
        <div style={{
          color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '28px', wordWrap: 'break-word'
        }}>
          {title}
        </div>
        <div style={{
          justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'
        }}>
          <div style={{
            color: '#D9DEEE', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', lineHeight: '22.40px', wordWrap: 'break-word'
          }}>
            {relativeTimeDisplay} 제작
          </div>
          <div style={{
            width: 2, height: 2, background: '#BFC3D3', borderRadius: 9999
          }} />
          <div style={{
            color: '#D9DEEE', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', lineHeight: '22.40px', wordWrap: 'break-word'
          }}>
            {num}개의 원고지
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
        {/* 수정 */}
        <div
          onClick={() => setShowEditPopup(true)} // ✅ 팝업 열기
          style={{
            paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 20, background: '#3A3D46',
            borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex',
            cursor: 'pointer',
          }}>
          <img src="/write_icon.svg" alt="Profile" width={24} height={24} />
          <div style={{
            textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Pretendard',
            fontWeight: '400', lineHeight: '19.60px', wordWrap: 'break-word'
          }}>
            수정
          </div>
        </div>
        {/* 삭제 */}
        <div
          onClick={() => {
            if (confirm('정말 삭제하시겠어요?')) {
              onDelete?.(id); // 삭제 함수 호출
            }
          }}
          style={{
            paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 20, background: '#3A3D46',
            borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex',
            cursor: 'pointer',
          }}>
          <img src="/delete_icon.svg" alt="Profile" width={24} height={24} />
          <div style={{
            textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Pretendard',
            fontWeight: '400', lineHeight: '19.60px', wordWrap: 'break-word'
          }}>
            삭제
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyManuItem;
