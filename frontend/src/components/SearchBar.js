import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          className="mb-2"
        />
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchBar;