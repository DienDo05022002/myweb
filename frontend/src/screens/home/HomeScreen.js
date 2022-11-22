import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import http from '../../api/axiosApi';
import { WEB_SEVER_URL } from '../../api/axiosApi';
import { Link } from 'react-router-dom';
import data from '../../data';
import BannerScreen from '../banner/BannerScreen';
import Product from '../../components/Product';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SlideShow from '../../layout/SlideShow';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/products');
        setProducts(res.data);
        console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, []);
  // console.log(products)
  return (
    <div>
      <div>
          <SlideShow/>
      </div>
      <h1>Sản phẩm tại quán</h1>
      <div className="products">
        <Row>
          {products.map((product , index) => (
            <Col sm={6} md={4} lg={3} className='mb-3'  key={product.slug}>
            <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
