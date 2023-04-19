import { Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';

export default function SearchBar() {
  return (
    <InputGroup className="justify-content-center m-1">
      <Form.Control
        className="p-2"
        placeholder="Search"
        aria-label="product-search"
        aria-describedby="product-search"
      />
      <InputGroup.Text>
        <AiOutlineSearch color="red" />
      </InputGroup.Text>
    </InputGroup>
  );
}
