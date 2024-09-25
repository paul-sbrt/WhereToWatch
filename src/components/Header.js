// src/components/Header.js
import React, { useState } from "react";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import logo from "../assets/logo.webp";
import "./styles/header.css";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container className="position-relative d-flex justify-content-between align-items-center">
        {/* Logo on the left */}
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="60"
            height="60"
            className="logo"
            alt="Where-to-watch Logo"
          />
        </Navbar.Brand>

        {/* Title centered */}
        <div className="header-text">
          <h1 className="m-0 header-title">WhereToWatch</h1>
        </div>

        {/* Search on the right */}
        <div className="d-flex align-items-center">
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Rechercher un film..."
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Rechercher
            </Button>
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
