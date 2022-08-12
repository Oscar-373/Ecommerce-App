import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useParams, useNavigate } from 'react-router-dom'
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Carousel } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { getAddCartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {

    const allProducts = useSelector(state => state.products);
    const [ productsDetail, setProductsDetail ] = useState({});
    const [ suggestedProducts, setSuggestedProducts ] = useState([]);
    const [count, setCount] = useState(0)

    const { id } = useParams();
    const dispatch= useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const productsFind = allProducts.find(productsItem => productsItem.id === Number(id))
        setProductsDetail(productsFind)

        const filteredProducts = allProducts.filter(productsItem => productsItem?.category.id === productsFind?.category.id)
        setSuggestedProducts(filteredProducts)
    }, [allProducts, id])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const addPurchases = () => {
      const purchase = {
        id: productsDetail.id,
        quantity: count
      }
      dispatch(getAddCartThunk(purchase))
    }

    return (
        <div>
            <Row>
                <Col xs={12} md={5} lg={5}>
                    <Carousel style={{height:"500px"}} >
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs?.[0]}
                            alt="First slide"
                            style={{height:'500px'}}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs?.[1]}
                            alt="Second slide"
                            style={{height:'500px'}}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs?.[2]}
                            alt="Third slide"
                            style={{height:'500px'}}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col>
                    <Row>
                        <h1>{productsDetail?.title}</h1>
                        <p>{productsDetail?.description}</p>
                    </Row>
                    <Row xs={12}>
                        <Col>
                            <h5>Price</h5>
                            <h5>$ {productsDetail?.price}</h5>
                        </Col>
                        <Col> 
                            <h5>Quantity</h5>
                            <Row xs={6} md={6} lg={6}> 
                                <button style={{width:'20px'}} onClick={() => setCount((count) => count - 1)}>-</button>
                                <input
                                style={{width:"40px"}}
                                onChange={e => setCount(e.target.value)} 
                                value={count}
                                />
                                <button style={{width:'20px'}} onClick={() => setCount((count) => count + 1)}>+</button>
                            </Row> 
                        </Col> 
                    </Row> 
                    <Row>
                        <button className="btn btn-warning mt-5" onClick={addPurchases}>Add to cart</button> 
                    </Row>
                </Col>
            </Row>
                <h3 className='mt-5 text-center'>Discover similar items</h3>
            <Row xs={1} md={2} lg={3} className="g-4 mt-5">
                {
                    suggestedProducts.map(products => (
                        <Col key={products.id}>
                            <Card onClick={() => navigate(`/products/${products.id}`)} style={{height:"300px"}}>
                                <Card.Img variant="top" src={products.productImgs[0]} />
                                <Card.Body>
                                    <Card.Title>{products.title}</Card.Title>
                                    <Card.Title>{products.price}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default ProductDetail;