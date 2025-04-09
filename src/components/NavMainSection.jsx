import React from 'react';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import CheckCommentBtn from './Buttons/CheckCommentBtn';

const NavMainSection = ({ onSave }) => {

  return (
    <div style={{
      width: 'auto',
      padding: '12px 12px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    }}>
      {/* 여기서 임시저장을 한다.  */}
        <SaveEpiBtn onClick={onSave} />
        <CheckCommentBtn />

    </div>
  );
};



export default NavMainSection;
