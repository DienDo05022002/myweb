// import './App.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useReducer, useEffect, useMemo } from 'react';
import Rating from './Rating';
import { Store } from './../screens/Store';
import { useContext, memo } from 'react';
import http from '../api/axiosApi';

function Product({ product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;
  // console.log(product);
  // console.log(cartItem)
  const percentDiscount = product.discount
  console.log(percentDiscount)
  const priceDiscount = product.price - product.price * (product.discount / 100)
  // console.log(priceDiscount)
  const productPrice = product.price

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
          <Link to={`/product/${product.slug}`} className='css-discount'>
            <img src={product.image} alt={product.name} />
            {percentDiscount === 0 ? null : (
              <div className='css-percentDiscount'>
                <strong className='css-percentDiscount-text'>Giảm</strong>
                <strong className='css-percentDiscount-percent'>{percentDiscount}%</strong>
              </div>
            )}
          </Link>
          <Card.Body>
            <Link to={`/product/${product.slug}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text className="title-product">
              {percentDiscount === 0 ? (
                <div className='price-original'>
                  <span className="icon-price">₫</span>
                  <div>{productPrice}</div>
                </div>
              ) : (
                <div className='price-priceDiscount'>
                  <div className='price-old'>
                    <span className="icon-price">₫</span>
                    <div>{productPrice}</div>
                  </div>
                  <div className='price-new'>
                    <span className="">₫</span>
                    <div>{priceDiscount}</div>
                  </div>
                </div>
              )}
            </Card.Text>
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
