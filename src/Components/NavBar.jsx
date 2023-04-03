export default function NavBar() {
    
    const navBar = {
        padding: "10px",
        backgroundColor: "red",
        color: "white",
        display: "flex",
        alginItems: "center",   
    }
    
    return (
        <div style={navBar}>
            <img src="images/LogoDelaware.png" width="50px"/>
        </div>          
    )
}