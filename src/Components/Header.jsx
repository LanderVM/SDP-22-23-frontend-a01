
import AuthenticationButton from "./authentication/AuthenticationButton"
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './NavBar';
import ShoppingCartIcon from './ShoppingCartIcon';
import { memo } from 'react';

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
                <div style={{marginLeft: 'auto',backgroundColor:'white'}}>
                    <ShoppingCartIcon/>
                </div>      
                <div style={{marginLeft: 'auto'}}>
                    <AuthenticationButton />
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default memo(Header)