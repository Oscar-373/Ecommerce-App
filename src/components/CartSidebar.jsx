import React from 'react';
import { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, getCartThunk } from '../store/slices/cart.slice';
import{ Row, Col } from 'react-bootstrap';

const CartSidebar = ({ show, handleClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartThunk());
    }, []);
    
    return (
        <Offcanvas show={show} onHide={handleClose} scroll={false} placement="end" style={{ background:"rgb(175, 238, 238)"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Button className='mb-5' onClick={() => dispatch(buyCartThunk())}>Buy cart</Button>
                {
                    cart.map(carts => (
                        <div key={carts.id} className="card text-white bg-info mb-3" onClick={() => navigate(`/products/${carts.id}`)}>
                            <div className="card-header">{carts.title}</div>
                                <Row>
                                    <Row>
                                        <h4 className="card-title text-center">{carts.title}</h4>
                                    </Row>
                                    <Col>
                                        <div className="card-body text-center">
                                            <h6 className="card-text">Quantity:</h6>
                                            <p className="card-text ">{carts.productsInCart.quantity}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="card-body text-center">
                                            <h6 className="card-text">Price:</h6>
                                            <p className="card-text">{carts.price}</p>
                                        </div>
                                    </Col>
                                </Row>
                        </div>
                    ))
                }
                
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebar;