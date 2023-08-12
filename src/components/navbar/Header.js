import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react";

const Header = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="header">
      <Navbar expand='lg' className="navbar mb-3">
        <Container>
          <Link className="link-reset" to='/'>
            <Navbar.Brand className="fw-bold">User Name</Navbar.Brand>
          </Link>
          <Navbar.Toggle onClick={() => handleShow()} aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            show={show}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton onClick={() => handleClose()}>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                User Name
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="d-flex justify-content-end align-items-start align-items-lg-center flex-grow-1 mb-4 mb-lg-0 me-2 me-lg-5 pe-3">
                <a className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" href="https://github.com/Kss03/store-app-react">API</a>
                <a className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-5" href="https://github.com/Kss03/store-app-react">Frontend</a>
                
                <Link  onClick={() => handleClose()} className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" to="/products">Products</Link>
                <Link  onClick={() => handleClose()} className="link-reset nav-link-btn ps-3 ps-lg-0" to="/card">Card</Link>
              </Nav>
              <button className=" btn login-btn">Log in</button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </section>
  )
}

export default Header