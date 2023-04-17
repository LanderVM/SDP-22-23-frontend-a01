import { memo } from 'react';


const footer = {
  padding: "10px",
  backgroundColor: "red",
  position:"absolute",
  bottom:"0"
}

export default memo(function Footer () {

  return (
    <footer style={footer}>
      <div style={{display:"inlineBlock",maxLength:"33%"}}>
        Contact us by telephone:
        045567543
      </div>
      <div style={{display:"inlineBlock",maxLength:"33%"}}>
        Conatct us by email:
        delaware.contact@gmail.com
      </div>
      <div style={{display:"inlineBlock",maxLength:"33%"}}>
        Have a nice day
      </div>
    </footer>
  );
})