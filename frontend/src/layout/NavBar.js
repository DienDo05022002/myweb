import React from 'react';
import './index.css';
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
import { useContext,useRef,useCallback } from 'react';
import { Store } from '../screens/Store';
import Login from '../screens/client/auth/Login';
import Register from '../screens/client/auth/Register';
import CartScreen from '../screens/cart/CartScreen';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Form } from 'react-router-dom';
import http from '../api/axiosApi';
import Search from './Search';
import SearchProductsItem from '../components/SearchProductsItem';
import { useSearchParams } from '../hook/useSearchParams';
import { debounce } from "lodash"
import CategorySideBar from '../components/CategorySideBar';


function NavBar() {
  const storeUser = localStorage.getItem('user');
  //set cart
  const state = useContext(Store);
  const dispatch = useContext(Store);
  const {
    state: { cart },
  } = state;
  const { fullBox } = state;

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

  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
// ------------------------------------------------------------------------------------------------------------------------
// FEATURE SEARCH
// ------------------------------------------------------------------------------------------------------------------------
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [query, setQuery] = useState('');

  const openDropdown = () => setVisible(true);
  const fetchDropdownOptions = async (value) => {
    try {
      const res = await http.get(`/search/find?q=${value}`);
      setDropdownOptions(res.data);
    } catch (err) {
      toast.error('Không có sản phẩm bạn tìm kiếm:(');
    }
  };
  const resultSearch = dropdownOptions.results
  const debounceDropDown = useRef(debounce((nextValue) => fetchDropdownOptions(nextValue), 100)).current;

  const submitHandlerSearch = async (value) => {
    try {
      const res = await http.get(`/search/find?q=${value}`);
      setQuery(res.data);
      navigate( `/search/find?q=${query}` );
    } catch (err) {
      toast.error('Không có sản phẩm bạn tìm kiếm:(');
    }
  }
  const handleInputOnchange = (e) => {
    const { value } = e.target;
    e.preventDefault();

    setKeyword(value);
    debounceDropDown(value)
    submitHandlerSearch(value)
  };
  // ------------------------------------------------------------------------------------------------------------------------
  // END
  // ------------------------------------------------------------------------------------------------------------------------
  const sideBarCategories = async () => {
    setSidebarIsOpen(true)
    try {
      const res = await http.get('/CategorySideBar');
      setCategories(res.data.product);
      console.log(res.data.product)
    } catch (err) {
      setSidebarIsOpen(false)
    }
  };
  console.log(categories);
  return (
    <div>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
              ? 'site-container d-flex flex-column full-box'
              : 'site-container d-flex flex-column'
        }
      ></div>
      <header className="header">
        <Container>
          {/* <LinkContainer to="/"> */}
            <Container>
              <Nav className="header-nav">
                <div className="header-nav">
                  <Button
                    variant="dark"
                    onClick={() => sideBarCategories()}
                    // onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  >
                    <i className="fas fa-bars header-nav-icon"></i>
                  </Button>
                  <Link to="/" className="header-nav-button-home">
                    Trang chu
                  </Link>

                  {/* ---------------------------------------------------------------------- */}
                  <form onSubmit={submitHandlerSearch}>
                    <InputGroup className="input-search">
                      <FormControl
                        name="q"
                        id="q"
                        placeholder="Tìm...."
                        value={keyword}
                        onChange={handleInputOnchange}
                        onClick={openDropdown}
                      />
                      <Button
                        variant="light"
                        onClick={() => navigate('/search/find')}
                      >
                        <i className="fas fa-search"></i>
                      </Button>
                    </InputGroup>
                  </form>
                    <div className='dropdown-search' style={{color:'red'}}>
                        {resultSearch && resultSearch.map((result) => (
                          <SearchProductsItem data={result} key={result._id}/>
                        ))}
                    </div>

                  {/* ---------------------------------------------------------------------- */}
                </div>
                <div className="header-nav-user">
                  <Link to="/cart" style={{ paddingTop: '6px' }}>
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
          {/* </LinkContainer> */}
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
          <button onClick={() => sideBarCategories()}>Danh mục</button>
          <Nav.Item>
            {categories.map((category,index) => (
              <div key={index}>
                <Link to={`/Category-sideBar/category/${category}`} className='nav-link'>{category}</Link>
              </div>
            ))}
            {/* <CategorySideBar caterogy={'combo'}></CategorySideBar> */}
            {/* <button onClick={() => navigate('/Category-sideBar/category/combo')}>x</button> */}
            {/* <Link to={'/Category-sideBar/category/combo'}>xxx</Link> */}
          </Nav.Item>
        </Nav>
        <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)} className='close-nav'>Close</button>
      </div>
    </div>
  );
}

export default NavBar;
