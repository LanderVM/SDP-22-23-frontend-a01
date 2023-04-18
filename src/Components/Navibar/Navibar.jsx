import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {GiHamburgerMenu} from "react-icons/gi";
import button from "bootstrap/js/src/button";
import {AccountButton} from "./AccountButton";
import {CartButton} from "./CartButton";
import './navibar.css';
import {SearchBar} from "./SearchBar";

const iconSize = 40;

export const Navibar = () => {
    return (<header className="delaware-navbar pb-1">
        <Navbar expand="lg">
            <Container className="delaware-navbar">
                <Button className="delaware-hamburger-menu me-3">
                    <GiHamburgerMenu className="p-1" size={iconSize} as={button}></GiHamburgerMenu>
                </Button>
                <Navbar.Brand className="delaware-navbar p-0 m-0" as={NavLink} to="/" replace>
                    <img src="/images/Delaware-logo_white.png" alt="delaware logo" width={200}/>
                </Navbar.Brand>
                <SearchBar/>
                <AccountButton iconSize={iconSize}/>
                <CartButton iconSize={iconSize}/>
            </Container>
        </Navbar>
    </header>);
};