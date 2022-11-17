import './index.css'
import React, { useState, useEffect, useContext } from 'react';
import Buttot from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import http from '../api/axiosApi';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Store } from './../screens/Store';
import { toast } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';

const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const results = sp.get('q');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await http.get(`/search/find?q=${results}`);
        if (res.data.success) {
          console.log(res.data.results);
          setQuery(res.data.results);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [results]);
  // console.log(query);

  // Feature
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

  // Get category
  // const [categories, setCategories] = useState([]);
  // const sideBarCategories = async () => {
  //   try {
  //     const res = await http.get('/Category-sideBar');
  //     setCategories(res.data);
  //     console.log(res.data.product);
  //   } catch (err) {
  //     toast.error('');
  //   }
  // };
  // // console.log(categories.product);
  // const c = categories.product;

  const [select, setSelect] = useState(['combo']);
  const [selectOverviewCategory , setSelectOverviewCategory] = useState(false)
  const [overviewCategory, setOverviewCategory] = useState([])
  const selectCategory = async () => {
    // setSelectOverviewCategory(true)
    console.log(select);
    try {
      const res = await http.get(`/Category-sideBar/category/${select}`);
      setOverviewCategory(res.data.product);
      setSelectOverviewCategory(true)
    } catch (err) {
      setSelectOverviewCategory(false)
    }
  };
  // console.log(select);
  console.log(overviewCategory)
  if (loading) {
    return (
      <div className="mt-10">
        <div className="min-h-[600px] flex items-center justify-center">
          ....Loading
        </div>
      </div>
    );
  }
  if (selectOverviewCategory) {
    return (
      <div className="mt-10">
      <div className='selectCategory'>
      <select
        value={select}
        onChange={(e) => {
          setSelect(e.target.value);
        }}
        onClick={() =>selectCategory()}
      >
        <option onClick={selectCategory} value="combo">combo</option>
        <option onClick={selectCategory} value="single">sigle</option>
        <option onClick={selectCategory} value="smoothies">smoothies</option>
      </select>
      </div>
      <Row>
        {overviewCategory &&
          overviewCategory.map((product) => (
            <Col md={3}>
              <Card className="product">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <Card.Body>
                  <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <Card.Text className="title-product">
                    {product.price}
                    {'.000'}
                  </Card.Text>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => addOrderHandler(product)}
                    >
                      Chọn
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      </div>
    );
  }
  return (
    <div>
      {/* <div className={sidebarIsOpen ? 'close' : 'open'}>
        <button onClick={() => sideBarCategories()}>category</button>
        <Button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}></Button>
        <Nav.Item>
          {c && c.map((category) => <strong>{category}</strong>)}
        </Nav.Item>
      </div> */}

      <div className='selectCategory'>
      <select
        value={select}
        onChange={(e) => {
          setSelect(e.target.value);
        }}
        onClick={() =>selectCategory()}
      >
        <option onClick={selectCategory} value="combo">combo</option>
        <option onClick={selectCategory} value="single">sigle</option>
        <option onClick={selectCategory} value="smoothies">smoothies</option>
      </select>
      </div>

      <Row>
        {query &&
          query.map((product) => (
            <Col md={3}>
              <Card className="product">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <Card.Body>
                  <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <Card.Text className="title-product">
                    {product.price}
                    {'.000'}
                  </Card.Text>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => addOrderHandler(product)}
                    >
                      Chọn
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Search;
