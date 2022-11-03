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
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from '../screens/Store';
import Login from '../screens/client/auth/Login';
import Register from '../screens/client/auth/Register';
import CartScreen from '../screens/cart/CartScreen';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState,useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import http from '../api/axiosApi'
import Search from './Search'
function NavBar() {
  const storeUser = localStorage.getItem('user');
  //set cart
  const state = useContext(Store);
  const dispatch = useContext(Store);
  const {
    state: { cart },
  } = state;
  // console.log({ state: { cart } });

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

  const sideBarCategories = async () => {
      try {
        const res = await http.get('/Category-sideBar')
        setCategories(res)
      } catch(err) {
        toast.error('')
      }
    }
    console.log(categories)
    // sideBarCategories()
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





                  <div>
                    <InputGroup className='input-search'>
                    <Button>
                      <i className="fas fa-search"></i>
                    </Button>
                       <FormControl></FormControl>
                    </InputGroup>
                  </div>







                </div>
                <div className="header-nav-user">
                  <Link to="/cart" style={{paddingTop: '6px'}}>
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
                        <Dropdown.Item href="#/action-3">
                          <Link to="/history-order">Lịch sử mua hàng</Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          <Link to="/profile">Tài khoản</Link>
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

  {/* ------------------------Show side bar------------------------ */}
      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <button onClick={() => sideBarCategories()} ></button>
          {/* <Button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}></Button> */}
          <Nav.Item>
            {categories.map((category) => (
              <strong>{category}</strong>


            ))}
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default NavBar;
