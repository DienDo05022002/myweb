import React from 'react';
import '../index.css';
import { useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import http from '../../../api/axiosApi';

const AdminPageProducts = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(1)

  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/admin/getProducts');
        setProducts(res.data);
        setRefresh((f) => f+1)
        console.log(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, [refresh]);
  // console.log(products.products)
  const results = products.products;
  console.log(results);
  return (
    <div className="p-container">
      <div className="p-container-product">
        {results &&
          results.map((i) => (
            <ListGroup.Item key={i._id} style={{ paddingTop: '15px' }}>
              <Row className="align-items-center">
                <Col md={4} style={{ display: 'flex' }}>
                  <img
                    src={i.image}
                    alt={i.name}
                    className="img-fluid rounded img-thumbnail"
                  ></img>{' '}
                  <p className="p-container-name">
                    <Link
                      to={`/product/${i.slug}`}
                      className="p-container-name"
                    >
                      {i.name}
                    </Link>
                  </p>
                </Col>
                {/* -------Handle quantiny & price & action delete----- */}
                <Col md={3} style={{ display: 'flex' }}></Col>
                <Col md={2}>
                  <Button variant="light" className="p-container-bt">
                    <i className="fas fa-pen"></i>
                  </Button>
                  <Button variant="light" className="p-container-bt">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </div>
      <div className="p-container-create-new">
        <strong className="p-container-new">News</strong>
        <Link to={'/admin-page/create'}>
          <Button className="p-container-create-new-bt">
            <i class="fas fa-plus-square"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPageProducts;
