import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // trim() removes whitespace
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Form onSubmit={searchHandler}>
      <div className="input-group">
        <Form.Control
          type="text"
          name="q"
          id="search_field"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="form-control"
        ></Form.Control>
        <div className="input-group-append">
          <Button type="submit" id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Search;
