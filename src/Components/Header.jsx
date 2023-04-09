import { memo } from 'react';
import { Link } from 'react-router-dom';

import AuthenticationButton from "./authentication/AuthenticationButton"
import { useAuth0 } from '@auth0/auth0-react';

const header = {
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alginItems: "center",   
}

function Header() {

    const { 
        isAuthenticated, 
        user
    } = useAuth0()
      
    return (
        <div style={header}>
            <img src="images/LogoDelaware.png" alt="logo" width="50px"/>
            
            {isAuthenticated ? <Link to={"/profile/" + user.email}><img src="images/menu.png" alt="logo" width="50px"/></Link> : <></>}
            <AuthenticationButton />
        </div>
    )
}

export default memo(Header)