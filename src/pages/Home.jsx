import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'
import { filterCategoryThunk, filterHeadlineThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
            .then(res => setCategories(res.data.data.categories));
    }, [])

    return (
        <div>
            <Row>
                <Col lg={3}>
                    <div className='sticky-sm-top text-center'>
                        <ListGroup variant="flush" >
                            <strong>Categories</strong>
                            {
                                categories.map(category => (
                                    <ListGroup.Item
                                        key={category.id}
                                        onClick={() => dispatch(filterCategoryThunk(category.id))}
                                    >
                                        {category.name}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup> 
                        <div className='mt-5'>
                            <strong className='text-center'>Price</strong>
                            <form>
                                <label htmlFor="from" className="form-label">from</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{background:"white", borderRadius:"5px"}}
                                    id="from"
                                    placeholder='0'
                                />
                                <label htmlFor="to" className="form-label">To</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{background:"white", borderRadius:"5px"}}
                                    id="to"
                                    placeholder='0'
                                />
                                <button type="button" className="btn btn-info mt-2">Filter price</button>
                            </form>
                        </div>
                    </div>
                </Col>
                <Col>
                    <h1 className='text-center'>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What are you looking for?"
                            aria-label="What are you looking for?"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button
                            className='btn-info'
                            variant="outline-secondary"
                            onClick={() => dispatch(filterHeadlineThunk(searchValue))}
                        >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {
                            products.map(productItem => (
                                <Col key={productItem.id}>
                                    <Card onClick={() => navigate(`/products/${productItem.id}`)} style={{ height: "370px" }}>
                                        <Card.Img variant="top" src={productItem.productImgs[0]} />
                                        <Card.Body>
                                            <Card.Title className='text-center'>{productItem.title}</Card.Title>
                                        </Card.Body>
                                        <Card.Body >
                                            <Row className='text-center'>  
                                                <Col>
                                                    <Card.Title>$ {productItem.price}</Card.Title>
                                                </Col>
                                                <Col>
                                                <button 
                                                style={{width:"50px", height:"50px", borderRadius:"50%", border:"none", background:"violet"}}
                                                >
                                                    <i className="fa-solid fa-cart-shopping"></i>
                                                </button>
                                                </Col>
                                            </Row>   
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;









