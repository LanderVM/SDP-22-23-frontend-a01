import { Link } from "react-bootstrap/lib/Navbar";



export default function ThankyouScreen () {

  return (
    <div >
      <p>Thankyou for your purchase!</p>
      <Link to="/home"><button>Go back to home page</button></Link>
    </div>
    
  );
}