import React from 'react';
import { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useNavigate } from 'react-router';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases);

    const converTime = time => {
        return new Date(time).toLocaleDateString("en-us", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } 

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    
    return (
        <div>
            <h1 className='text-center'>Purchases</h1>
                {
                    
                    purchases.map(purchase => (
                        <Card key={purchase.id} className="mt-5" bg='info' style={{color:"white"}}>
                            <Card.Body>
                                <Card.Title>{converTime(purchase.createdAt)}</Card.Title>
                            </Card.Body>
                            <Card bg='info' style={{color:"white"}}>
                            <Card.Body>
                                {purchase.cart.products.map(cart => (
                                    <Row key={cart.id} onClick={() => navigate(`/products/${cart.id}`)}> 
                                        <Col><Card.Title className='m-3'>{cart.title}</Card.Title></Col>
                                        <Col><Card.Title className='m-3 text-center'>{cart.productsInCart.quantity}</Card.Title></Col>
                                        <Col><Card.Title className='m-3 text-center'> $ {cart.price}</Card.Title></Col>
                                    </Row>
                                )
                                )}
                            </Card.Body>
                            </Card>
                            
                        </Card>
                        
                    ))
                } 
        </div>
    );
};

export default Purchases;