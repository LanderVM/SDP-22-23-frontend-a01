import {Form, InputGroup} from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";

export const SearchBar = () => {
    return (
        <InputGroup className="justify-content-center p-3">
            <Form.Control
                placeholder="Search"
                aria-label="product-search"
                aria-describedby="product-search"/>
            <InputGroup.Text>
                <AiOutlineSearch color="red"/>
            </InputGroup.Text>
        </InputGroup>
    );
}