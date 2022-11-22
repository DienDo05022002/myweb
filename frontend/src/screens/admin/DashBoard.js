import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';
import http from '../../api/axiosApi';
import LoadingBox from '../../components/LoadingBox';

//Config Socket.io
import { io } from 'socket.io-client';
const socketServerUrl = 'http://localhost:3010';

const config = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 10,
};

const socket = io(socketServerUrl, config);

const DashBoard = () => {
      const [products, setProducts] = useState([]);
      const [user, setUser] = useState([]);
      const [orders, setOrders] = useState([]);
      const [newOrders, setNewOrders] = useState([]);
      const [socketOn, setSocketOn] = useState(false);
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
      useEffect(() => {
        const results = async () => {
          try {
            const res = await http.get('/admin/getAllOrders');
            setOrders(res.data);
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
      console.log(orders)


      //-----------------------------------------------------------------
      //-------------Socket.io---------------------------------------
      useEffect(() => {
        socket.on('sever-message', (data) => {
          console.log(data)
          setNewOrders(data)
          setSocketOn(true)
          // alert(data.message)
        })
      })

      console.log(newOrders)
  return (
    <div className='dashboard-container'>
      <div className='dashboard-title-welcome'>
        <h1>Welcome to dashboard for Admin</h1>
        <i class="fab fa-product-hunt"></i>
      </div>
      <div style={{display: 'flex'}} className='dashboard-container--div'>
        <strong className='dashboard-container--text' style={{display: 'flex'}}>
          <i class="fab fa-product-hunt"></i>Products
        </strong>
        <div className='dashboard-container--text'>Numbers: {products.totalProducts}</div>
        <div className='dashboard-container--text'>Number-page: {products.totalPage}</div>
        <Link to={'/admin-page/products'} className='dashboard-container--text'>Xem</Link>
      </div>

      <div style={{display: 'flex'}} className='dashboard-container--div'>
        <strong className='dashboard-container--text'>
          <i class="fas fa-user"></i>Users
        </strong>
        <div className='dashboard-container--text'>Numbers: {user.totalUsers}</div>
        <div className='dashboard-container--text'>Number-page: {user.totalPage}</div>
        <Link to={'/admin-page/users'} className='dashboard-container--text'>Xem</Link>
      </div>

      <div style={{display: 'flex'}} className='dashboard-container--div'>
        <strong className='dashboard-container--text'>
          <i class="fas fa-scroll"></i>Orders
        </strong>
        <div className='dashboard-container--text'>Numbers: {orders.totalOrder}</div>
        <div className='dashboard-container--text'>Number-page: {orders.totalPage}</div>
        <Link to={'/admin-page/overviewOrder'} className='dashboard-container--text'>Xem</Link>
      </div>

      <div>
        <div className='dashboard-container--order'>
          {
            socketOn === true ? (<div className='dashboard-container--newOrder'>
              <i class="fas fa-bell" style={{color: '#ff0000bf', fontSize: '25px'}}></i>
              <p className='dashboard-container--message'><strong>Message:</strong>{' '}{newOrders.message}</p>
              <p className='dashboard-container--message'><strong>At:</strong>{' '}{newOrders.newOrder.newOrders.createdAt}</p>
              <p className='dashboard-container--message'><strong>Customer:</strong>{' '}{newOrders.newOrder.newOrders.user}</p>
              <i class="far fa-hand-point-right" style={{fontSize: '25px'}}></i>
              <Link to={'/admin-page/overviewOrder'} className='dashboard-container--text'>Detail orders</Link>
            </div>) : (<div className='dashboard-container--'>
              <i class="fas fa-store" style={{color: 'red', fontSize: '25px'}}></i>
              <p className='dashboard-container--p'>No new orders yet</p>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
