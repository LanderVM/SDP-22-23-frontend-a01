import { Link } from "react-router-dom"

const navBar = {
    padding: "10px",
    backgroundColor: "#8B0000",
    color: "White",
    display: "grid",
    textAlign: "center",
    gridTemplateColumns: "auto auto",
    alginItems: "center",   
}

export default function NavBar() {
    return (
        <div style={navBar}>
            <Link to="/home" style={{color: "white", fontSize: "20px"}}>Home</Link>
            <Link to="/test" style={{color: "white", fontSize: "20px"}}>Not found</Link>
        </div>
    )
}