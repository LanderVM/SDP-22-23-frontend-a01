import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {VscAccount} from "react-icons/vsc";
import Navbar from "react-bootstrap/Navbar";

export const AccountButton = ({iconSize}) => {
    return (
        <Nav.Link style={{display: "flex"}} className="align-items-center" as={NavLink} to="/account"
                  replace>
            <VscAccount size={iconSize} className="pe-1"/>
            <Navbar.Text className="delaware-navbar m-0 mb-1 p-0" as="h2">Account</Navbar.Text>
        </Nav.Link>
    );
}


