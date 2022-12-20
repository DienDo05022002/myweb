import React from 'react';
import { useState, useEffect } from 'react';
import http from '../../http/axiosApi';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';

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

export async function getServerSideProps(context) {
  const resProducts = await http.get('/admin/getProducts');
  const resUsers = await http.get('/getAllUsers');
  const resOrders = await http.get('/admin/getAllOrders');
  const resCategory = await http.get('/admin/getAllCategory');

  const getAllProducts = await resProducts.data;
  const getAllUsers = await resUsers.data
  const getAllOrders = await resOrders.data
  const getAllCategory = await resCategory.data
  // console.log(getAllProducts)
  return {
    props: {getAllProducts, getAllUsers, getAllOrders, getAllCategory},
  }
}

const DashBoard = ({getAllProducts, getAllUsers, getAllOrders, getAllCategory}) => {
  console.log(getAllCategory)
  const [freshToken, setFreshToken] = useState()
  // const [products, setProducts] = useState([]);
  // const [user, setUser] = useState([]);
  // const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [socketOn, setSocketOn] = useState(false);
  // console.log(orders);
  // console.log(user);
  // useEffect(() => {
  //     const results = async () => {
  //       try {
  //         const res = await http.get('/admin/getProducts');
  //         setProducts(res.data);
  //       } catch (err) {
  //         if (err.res) {
  //           console.log(err.res.data.message);
  //         } else {
  //           console.log('Error: Network Error');
  //         }
  //       }
  //     };
  //     results();
  // }, []);

  // useEffect(() => {
  //   // if(freshToken)
  //   const results = async () => {
  //     try {
  //       const res = await http.get('/getAllUsers');
  //       setUser(res.data);
  //     } catch (err) {
  //       if (err.res) {
  //         console.log(err.res.data.message);
  //       } else {
  //         console.log('Error: Network Error');
  //       }
  //     }
  //   };
  //   results();
  // }, []);
  // useEffect(() => {
  //   // if(freshToken)
  //   const results = async () => {
  //     try {
  //       const res = await http.get('/admin/getAllOrders');
  //       setOrders(res.data);
  //     } catch (err) {
  //       if (err.res) {
  //         console.log(err.res.data.message);
  //       } else {
  //         console.log('Error: Network Error');
  //       }
  //     }
  //   };
  //   results();
  // }, []);

  //========================================================================
  //-------------Socket.io---------------------------------------
  useEffect(() => {
    socket.on('sever-message', (data) => {
      console.log(data);
      setNewOrders(data);
      setSocketOn(true);
      // alert(data.message)
    });
  });

  console.log(newOrders);
  return (
    <div>
      {/* <h2>Welcome to dashboard for admin</h2> */}
      <div className="dashboard-container">
        <div className="dashboard-title-welcome">
          <h1>Welcome to dashboard for Admin</h1>
          {/* <i class="fab fa-product-hunt"></i> */}
        </div>
        <div style={{ display: 'flex' }} className="dashboard-container--div">
          <strong
            className="dashboard-container--text"
            style={{ display: 'flex' }}
          >Products
            {/* <i class="fab fa-product-hunt"></i>Products */}
          </strong>
          <div className="dashboard-container--text">
            Numbers: {getAllProducts.totalProducts}
          </div>
          <div className="dashboard-container--text">
            Number-page: {getAllProducts.totalPage}
          </div>
          <Link
            href="/dashboard/products/pageProducts"
            className="dashboard-container--text"
          >
            Xem
          </Link>
        </div>

        <div style={{ display: 'flex' }} className="dashboard-container--div">
          <strong className="dashboard-container--text">
          Users
            {/* <i class="fas fa-user"></i>Users */}
          </strong>
          <div className="dashboard-container--text">
            Numbers: {getAllUsers.totalUsers}
          </div>
          <div className="dashboard-container--text">
            Number-page: {getAllUsers.totalPage}
          </div>
          <Link
            href="/dashboard/users"
            className="dashboard-container--text"
          >
            Xem
          </Link>
        </div>

        <div style={{ display: 'flex' }} className="dashboard-container--div">
          <strong className="dashboard-container--text">
          Orders
            {/* <i class="fas fa-scroll"></i>Orders */}
          </strong>
          <div className="dashboard-container--text">
            Numbers: {getAllOrders.totalOrder}
          </div>
          <div className="dashboard-container--text">
            Number-page: {getAllOrders.totalPage}
          </div>
          <Link
            href="/dashboard/orders/pageOrders"
            className="dashboard-container--text"
          >
            Xem
          </Link>
        </div>

        <div style={{ display: 'flex' }} className="dashboard-container--div">
          <strong className="dashboard-container--text">
            Category
            {/* <i class="fas fa-scroll"></i>Orders */}
          </strong>
          <div className="dashboard-container--text">
            Numbers: {getAllCategory.totalCategory}
          </div>
          <Link
            href="/dashboard/category"
            className="dashboard-container--text"
          >
            Xem
          </Link>
        </div>
{/* ================================================================================================================ */}
{/* ================================SOCKET.IO================================================ */}
        <div>
          <div className="dashboard-container--order">
            {/* {socketOn === true ? alert("You have new orders") : null} */}
            {socketOn === true ? (
              <div className="dashboard-container--newOrder">
                <Toast>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Neworders</strong>
                    <small>{newOrders.newOrder.newOrders.createdAt}</small>
                  </Toast.Header>
                  <Toast.Body>
                    {newOrders.newOrder.newOrders.user}:{newOrders.message}
                  </Toast.Body>
                </Toast>
                {/* <i
                  class="fas fa-bell"
                  style={{ color: '#ff0000bf', fontSize: '25px' }}
                ></i> */}
                <p className="dashboard-container--message">
                  <strong>Message:</strong> {newOrders.message}
                </p>
                <p className="dashboard-container--message">
                  <strong>At:</strong> {newOrders.newOrder.newOrders.createdAt}
                </p>
                <p className="dashboard-container--message">
                  <strong>Customer:</strong> {newOrders.newOrder.newOrders.user}
                </p>
                <i
                  class="far fa-hand-point-right"
                  style={{ fontSize: '25px' }}
                ></i>
                <Link
                  href="/dashboard/orders/pageOrders"
                  className="dashboard-container--text"
                >
                  Detail orders
                </Link>
              </div>
            ) : (
              <div className="dashboard-container--">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title className="dashboard-container--p">No new orders yet</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    No new orders yet
                    </Card.Subtitle>
                    <Card.Text>
                    There are currently no new orders
                    </Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>
                </Card>
                {/* <i
                  class="fas fa-store"
                  style={{ color: 'red', fontSize: '25px' }}
                ></i>
                <p className="dashboard-container--p">No new orders yet</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;


// export async function getServerSideProps({req, res}) {
//   const token = req.cookies.tokens
//   console.log(token)
//   return {
//     props: {token},
//   }
// }
