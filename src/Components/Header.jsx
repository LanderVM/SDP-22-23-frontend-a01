import { memo } from 'react';
import { Link } from 'react-router-dom';

import AuthenticationButton from "./authentication/AuthenticationButton"
import { useAuth0 } from '@auth0/auth0-react';

const header = {
    padding: "10px",
    backgroundColor: "red",
}

function Header() {

    const { 
        isAuthenticated, 
        user
    } = useAuth0()
      
    return (
        <div style={header} className='containter'>
            <div className='d-flex align-items-center' >
                <div>
                    <img src="/images/LogoDelaware.png" alt="logo" width='75px' height='75px'/>
                </div>       
                <div style={{marginLeft: 'auto'}}>
                    <AuthenticationButton />
                </div>
            </div>
            
        </div>
    )
}

export default memo(Header)