import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Button, Form, InputGroup} from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";
import {VscAccount} from "react-icons/vsc";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {GiHamburgerMenu} from "react-icons/gi";
import button from "bootstrap/js/src/button";
import './navibar.css';

const itemSizes = 40;

export const Navibar = () => {
    return (<header className="delaware-navbar pb-1">
        <Navbar expand="lg">
            <Container className="delaware-navbar">
                <Button className="delaware-hamburger-menu me-3">
                    <GiHamburgerMenu className="p-1" size={itemSizes} as={button}></GiHamburgerMenu>
                </Button>
                <Navbar.Brand className="delaware-navbar p-0 m-0" as={NavLink} to="/" replace>
                    <img src="/images/Delaware-logo_white.png" alt="delaware logo" width={200}/>
                </Navbar.Brand>
                <InputGroup className="justify-content-center p-3">
                    <Form.Control
                        placeholder="Search"
                        aria-label="product-search"
                        aria-describedby="product-search"
                    />
                    <InputGroup.Text>
                        <AiOutlineSearch color="red"/>
                    </InputGroup.Text>
                </InputGroup>
                <Nav.Link style={{display: "flex"}} className="align-items-center" as={NavLink} to="/account"
                          replace>
                    <VscAccount size={itemSizes} className="pe-1"/>
                    <Navbar.Text className="delaware-navbar m-0 mb-1 p-0" as="h2">Account</Navbar.Text>
                </Nav.Link>
                <Nav.Link style={{display: "flex"}} className="ps-3 align-items-center" as={NavLink}
                          to="/shoppingCart"
                          replace>
                    <HiOutlineShoppingCart size={itemSizes} className="pe-1"/>
                    <Navbar.Text className="delaware-navbar m-0 mb-1 p-0" as="h2">Cart</Navbar.Text>
                </Nav.Link>
            </Container>
        </Navbar>
    </header>);
};