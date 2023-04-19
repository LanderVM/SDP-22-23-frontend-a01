import React, { memo } from 'react';

const footer = {
  padding: '10px',
  backgroundColor: 'red',

};

export default memo(() => (
  <footer style={footer}>
    <div style={{ display: 'inlineBlock', maxLength: '33%' }}>
      Contact us by telephone:
      045567543
    </div>
    <div style={{ display: 'inlineBlock', maxLength: '33%' }}>
      Conatct us by email:
      delaware.contact@gmail.com
    </div>
    <div style={{ display: 'inlineBlock', maxLength: '33%' }}>
      Have a nice day
    </div>
  </footer>
));
