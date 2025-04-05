import React from 'react';
import SaveEpiBtn from './Buttons/SaveEpiBtn';
import CheckCommentBtn from './Buttons/CheckCommentBtn';

const NavMainSection = () => {

  return (
    <div style={{
      width: 'auto',
      padding: '12px 12px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    }}>
        <SaveEpiBtn />
        <CheckCommentBtn />

    </div>
  );
};



export default NavMainSection;
