import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';



const NavBar = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if(token){
      setShow(true);
    }else{
      navigate('/login')
    }
  }

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/Login");
  }

    return (
      <>
        <Navbar bg="primary" expand="lg">
          <Container>
            <Navbar.Brand>Ecommerce-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" >
                <Nav.Link href="/#/" className='text-center'>Home</Nav.Link>
                <Nav.Link href="/#/purchases" className='text-center'>Purchases</Nav.Link>
                <Nav.Link onClick={handleShow} className="text-center">Shopping cart</Nav.Link>
                {
                  token ? (
                    <Nav.Link as={Button} onClick={logout} className='text-center'>Log out</Nav.Link>
                  ) : (
                    <Nav.Link href="/#/login" >Login</Nav.Link>
                  )
                }
               
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <CartSidebar show={show} handleClose={handleClose} />
      </>
    );
};

export default NavBar;