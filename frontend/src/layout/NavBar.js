import React from 'react'
import { BrowserRouter, Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from '../screens/Store';
import Login from '../screens/client/auth/Login';
import Register from '../screens/client/auth/Register';
import CartScreen from '../screens/cart/CartScreen';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useEffect} from 'react'

function NavBar() {
    const storeUser = localStorage.getItem('user');
  console.log(storeUser);
  //set cart
  const state = useContext(Store);
  const dispatch = useContext(Store);
  console.log(dispatch);
  const {
    state: { cart },
  } = state;
  console.log({ state: { cart } });

   const navigate = useNavigate()
   const logOut = () => {
    localStorage.removeItem('tokens')
    localStorage.removeItem('user')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('selectorPaymentMethod')
      navigate('/')
  };
  return (
    <div className='menu-bar'>
        <Container>
        <Nav className="header-nav">
              <div className="header-nav">
                <button className='header-nav-icon'>
                  <i className="fas fa-bars"></i>
                </button>
                <Link to="/" className='header-nav-button-home'>Trang chu</Link>
                <div>Tìm kiếm</div>
              </div>
              <div  className="header-nav-user">
                <Link to="/cart">
                  Giỏ
                  <i
                    className="fas fa-shopping-cart fa-shopping-cart-color"
                  ></i>
                  {cart.cartItem.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItem.reduce((a, b) => a + b.quantiny, 0)}
                    </Badge>
                  )}
                </Link>
                {storeUser !== null ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-button-dark-example1"
                      variant="secondary"
                    >
                      {storeUser}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-4" onClick={logOut}>
                        Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <span>
                    <Link to="/login">Đăng nhập</Link>
                  </span>
                )}
              </div>
            </Nav>
            </Container>
    </div>
  )
}

export default NavBar