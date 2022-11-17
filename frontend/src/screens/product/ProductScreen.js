import React from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useReducer, useEffect, useContext } from 'react';
import http from '../../api/axiosApi';
import Rating from '../../components/Rating';
import './index.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';

function ProductScreen() {
  const [productDetail, setProductDetail] = useState([]);
  const params = useParams();
  const { slug } = params;
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get(`/product/slug/${slug}`);
        setProductDetail(res.data);
        console.log(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, [slug]);

  // Feature cart
  // 1. buy now
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cart: { cartItem} } = state;
  const buyOrderHandler = async () => {
    const existItem = cart.cartItem.find((x) => x._id === productDetail._id);
    const quantiny = existItem ? existItem.quantiny + 1 : 1;
    const data = await http.get(`product/${productDetail._id}`);
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...productDetail, quantiny },
    });
    navigate('/cart')
  };

  //2. add
  const addOrderHandler = async (i) => {
    const existItem = cartItem.find((x) => x._id === i._id);
    console.log(existItem)
    const quantiny = existItem ? existItem.quantiny + 1 : 1;
    const {data} = await http.get(`product/${i._id}`);
    console.log(data)
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...i, quantiny },
    });
  };

  return (
    <div>
      <Row className="row-detail">
        <Col md={6}>
          <img
            src={productDetail?.image}
            alt={productDetail?.name}
            className="img-large"
          />
          <p>{productDetail?.name}</p>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{productDetail?.name}</h2>
            </ListGroup.Item>
            <div>
              <Card.Title>{productDetail?.name}</Card.Title>
              <Card.Title>{productDetail?.discount}{'.000'}</Card.Title>
              <Card.Text className="title-product">
                <p>Giá: <span className='icon-price'>₫</span>{productDetail?.price}{'.000'}</p>
              </Card.Text>
            </div>
            <div>
              <Rating
                rating={productDetail?.rating}
                numReviews={productDetail?.numReviews}
                className="rating"
              />
            </div>
            <Card.Text>
              <p>Mô tả: {productDetail?.description}</p>
              <p>Tích poin: {productDetail?.countIn} poin</p>
            </Card.Text>
            <ListGroup.Item>
              <div className="d-grid">
                <Button variant="primary" onClick={buyOrderHandler}>Order ngay</Button>
                <Button variant="primary" onClick={()=> addOrderHandler(productDetail)}>Chọn</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
