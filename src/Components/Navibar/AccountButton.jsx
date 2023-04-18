import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {VscAccount} from "react-icons/vsc";
import Navbar from "react-bootstrap/Navbar";
import './button.css';

export const AccountButton = ({iconSize}) => {
    return (
        <Nav.Link style={{display: "flex"}} className="p-1 align-items-center navibar-button" as={NavLink} to="/account"
                  replace>
            <VscAccount size={iconSize} className="p-1 me-1"/>
            <Navbar.Text className="navibar-button m-0 mb-1 p-0" as="h2">Account</Navbar.Text>
        </Nav.Link>
    );
}


