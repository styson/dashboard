import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Dovetail Software</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>      
  )
}

export default Navigation;
