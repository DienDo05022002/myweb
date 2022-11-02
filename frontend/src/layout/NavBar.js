import React from 'react';
import {
  BrowserRouter,
  Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
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
import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

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

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('selectorPaymentMethod');
    navigate('/');
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  return (
    <div>
      <div
        className={
          sidebarIsOpen
            ? // ? //fullBox
              'site-container active-cont d-flex flex-column full-box'
            : 'site-container active-cont d-flex flex-column'
            ? // : //fullBox
              'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      ></div>
      <header className="header">
        <Container>
          <LinkContainer to="/">
            <Container>
              <Nav className="header-nav">
                <div className="header-nav">
                  <Button
                    variant="dark"
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  >
                    <i className="fas fa-bars header-nav-icon"></i>
                  </Button>
                  <Link to="/" className="header-nav-button-home">
                    Trang chu
                  </Link>
                  <div>Tìm kiếm</div>
                </div>
                <div className="header-nav-user">
                  <Link to="/cart">
                    Giỏ
                    <i className="fas fa-shopping-cart fa-shopping-cart-color"></i>
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
                        <Link to="/history-order">
                          Lịch sử mua hàng
                        </Link>
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
            {/* </div> */}
          </LinkContainer>
        </Container>
      </header>
      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default NavBar;
