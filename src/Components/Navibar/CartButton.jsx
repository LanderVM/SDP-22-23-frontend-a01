import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {HiOutlineShoppingCart} from "react-icons/hi";
import Navbar from "react-bootstrap/Navbar";

export const CartButton = ({iconSize}) => {
    return (
        <Nav.Link style={{display: "flex"}} className="ps-3 align-items-center" as={NavLink}
                  to="/shoppingCart"
                  replace>
            <HiOutlineShoppingCart size={iconSize} className="pe-1"/>
            <Navbar.Text className="delaware-navbar m-0 mb-1 p-0" as="h2">Cart</Navbar.Text>
        </Nav.Link>
    );
}