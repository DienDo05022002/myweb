// import './App.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useReducer, useEffect } from 'react';
import Rating from './Rating';
import { Store } from './../screens/Store';
import { useContext, memo } from 'react';
import http from '../api/axiosApi';

function Product({ product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const addOrderHandler = async (i) => {
    const existItem = cartItem.find((x) => x._id === i._id);
    console.log(existItem);
    const quantiny = existItem ? existItem.quantiny + 1 : 1;
    const { data } = await http.get(`product/${i._id}`);
    console.log(data);

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...i, quantiny },
    });
  };
  return (
    <div>
      <div>
        <Card className="product">
          <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <Card.Body>
            <Link to={`/product/${product.slug}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text className="title-product"><span className='icon-price'>₫</span>{product.price}{'.000'}</Card.Text>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="primary"
                onClick={() => addOrderHandler(product)}
              >
                Chọn
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default memo(Product);
