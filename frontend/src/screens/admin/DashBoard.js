import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';
import http from '../../api/axiosApi';

const DashBoard = () => {
      const [products, setProducts] = useState([]);
      const [user, setUser] = useState([]);
      useEffect(() => {
        const results = async () => {
          try {
            const res = await http.get('/admin/getProducts');
            setProducts(res.data);
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


      useEffect(() => {
        const results = async () => {
          try {
            const res = await http.get('/getAllUsers');
            setUser(res.data);
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
      console.log(products)
  return (
    <div>
      <div style={{display: 'flex'}}>
        <strong>Products</strong>
        <div>{products.totalProducts}</div>
        {/* <div>{products.totalPage}</div> */}
        <Link to={'/admin-page/products'}>Xem</Link>
      </div>

      <div style={{display: 'flex'}}>
        <strong>Users</strong>
        <div>{user.totalUsers}</div>
        {/* <div>{user.totalPage}</div> */}
        <Link to={'/admin-page/users'}>Xem</Link>
      </div>
    </div>
  );
};

export default DashBoard;
