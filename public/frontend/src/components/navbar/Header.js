import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../reducers/Login/Login";

const Header = () => {

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {isLogin} = useSelector((store) => store.login)
  

  const logoutAuth = () => {
    dispatch(onLogout())
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
  }

  let userName = 'Guest';
  if (isLogin) {
    userName = localStorage.userName;
  }

  const loginButton = (
    <Link className="ms-3 ms-lg-0" to="/login" state={{location: useLocation().pathname}}>
      <button onClick={() => handleClose()} className="btn login-btn">Log in</button>
    </Link>
  )

  const logoutButton = <button onClick={() => logoutAuth()} className=" ms-3 ms-lg-0 btn login-btn">LogOut</button>

  const logInOutButton = isLogin ? logoutButton : loginButton;

  return (
    <section className="header">
      <Navbar expand='lg' className="navbar">
        <Container>
          <Link className="link-reset" to='/'>
            <Navbar.Brand className="fw-bold header-title">
              <i className="bi bi-person-circle me-2"></i>
              {userName}
            </Navbar.Brand>
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
                {/* {userName} */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="d-flex justify-content-between align-items-start align-items-lg-center flex-grow-1 mb-4 mb-lg-0 pe-3">
                <div className="d-flex flex-column flex-lg-row">
                  <a className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" href="https://github.com/Kss03/store-app">Source Code</a>
                  <Link onClick={() => handleClose()} 
                    className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3"
                    to="/creator">Create new product</Link>
                </div>
                <div className="d-flex flex-column flex-lg-row">
                  {/* <Link  onClick={() => handleClose()} 
                    className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" 
                    to="/">Home Page</Link> */}
                  <Link  onClick={() => handleClose()} 
                    className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" 
                    to="/products">Products</Link>
                </div>
                <div className="d-flex flex-row justify-content-between button-container">
                  <Link  onClick={() => handleClose()} 
                    className=" btn link-reset d-flex align-items-center card-link-btn ms-lg-0 me-3 mb-3 mb-lg-0" 
                    to="/card">
                      <i className="bi bi-basket2 me-1"></i>
                      Cart
                  </Link>
                  {logInOutButton}
                </div>
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </section>
  )
}

export default Header


{/* <section className="header">
      <Navbar expand='lg' className="navbar mb-3">
        <Container>
          <Link className="link-reset" to='/'>
            <Navbar.Brand className="fw-bold header-title">{userName}</Navbar.Brand>
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
                {userName}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="d-flex justify-content-end align-items-start align-items-lg-center flex-grow-1 mb-4 mb-lg-0 me-2 me-lg-5 pe-3">
                <a className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-5" href="https://github.com/Kss03/store-app">Source Code</a>


                <Link onClick={() => handleClose()} 
                  className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3"
                  to="/creator">Create products</Link>
                
                <Link  onClick={() => handleClose()} 
                  className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" 
                  to="/">Home Page</Link>
                <Link  onClick={() => handleClose()} 
                  className="link-reset nav-link-btn ps-3 ps-lg-0 mb-3 mb-lg-0 me-1 me-lg-3" 
                  to="/products">Products</Link>
                <Link  onClick={() => handleClose()} 
                  className="link-reset nav-link-btn ps-3 ps-lg-0" 
                  to="/card">
                    <i className="bi bi-basket2 me-1"></i>
                    Cart
                </Link>
              </Nav>
              {logInOutButton}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </section> */}