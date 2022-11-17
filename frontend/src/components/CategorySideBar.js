import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import http from '../api/axiosApi';



const CategorySideBar = () => {
  const params = useParams();
  const category  = params.category
  // console.log(params.category)
  console.log(category)


  const [overviewCategory, setOverviewCategory] = useState([])
  const [select, setSelect] = useState(['combo']);

  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get(`/Category-sideBar/category/${category}`);
        setOverviewCategory(res.data.product);
        console.log(res.data.product);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, [category]);
  const selectCategory = async () => {
    try {
      const res = await http.get(`/Category-sideBar/category/${select}`);
      setOverviewCategory(res.data.product);
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <>
    <div>
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
                      // onClick={() => addOrderHandler(product)}
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
    </>
  )
}

export default CategorySideBar