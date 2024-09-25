// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Paul Sabourault. Tous droits
              réservés.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
