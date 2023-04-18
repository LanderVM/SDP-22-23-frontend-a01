import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Form, InputGroup} from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";
import {VscAccount} from "react-icons/vsc";
import {HiOutlineShoppingCart} from "react-icons/hi";

// TODO custom Bootstrap class
const delawareStyle = {
    backgroundColor: "#EC4842",
    color: "white",
}

export const Navibar = () => {
    return (
        <header className="pb-1">
            <Navbar style={delawareStyle} expand="lg">
                <Container className="justify-content-start">
                    <Navbar.Toggle aria-controls="navigation-collapse"/>
                    <Navbar.Brand style={delawareStyle} as={NavLink} to="/" replace> {/*TODO weird bug here: inspect element on the blank space right of delaware logo to see*/}
                        <img src="/images/Delaware-logo_white.png" alt="delaware logo" width="20%"/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="navigation-collapse">
                        <Nav className="me-auto">
                            <Nav.Link style={delawareStyle} as={NavLink} to="/home" replace>Home</Nav.Link>
                            <Nav.Link style={delawareStyle} as={NavLink} to="/products" replace>Products</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <InputGroup  style={{maxWidth: "40%"}}>
                        <Form.Control
                                      placeholder="Search"
                                      aria-label="product-search"
                                      aria-describedby="product-search"
                        />
                        <InputGroup.Text>
                            <AiOutlineSearch color="red"/>
                        </InputGroup.Text>
                    </InputGroup>
                    <Nav.Link style={{display:"flex"}} className="p-1" as={NavLink} to="/account" replace>
                        <VscAccount size={40} className="p-1"/>
                        <Navbar.Text style={delawareStyle}>Account</Navbar.Text>
                    </Nav.Link>
                    <Nav.Link style={{display:"flex"}} className="p-1" as={NavLink} to="/cart" replace> {/*TODO move style={} out*/}
                        <HiOutlineShoppingCart size={40} className="p-1"/>
                        <Navbar.Text style={delawareStyle}>Cart</Navbar.Text>
                    </Nav.Link>
                </Container>
            </Navbar>
        </header>
    );
};