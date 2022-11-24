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
import { toast } from "react-toastify";

const AdminPageProducts = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(1)

  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/admin/getProducts');
        setProducts(res.data);
        // setRefresh((f) => f+1)
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
  }, []);
  // console.log(products.products)
  const results = products.products;
  // console.log(results);

  const handleOnDelete = async (id) => {
    try {
      const res = await http.delete(`/admin/deleteProduct/${id}`);
      if (res.data.success) 
      console.log(res.data);

      setProducts(products.products.filter(p => p._id !== id))
      toast.success('Delete product Successfully')
      // console.log(products)
      // console.log("Xóa thành công:" + res);
    } catch (err) {
      toast.error('Faild');
      console.log({err})
    }
}
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
                    <Link to={`/admin-page/updata/${i._id}`}>
                      <i className="fas fa-pen"></i>
                    </Link>
                  </Button>
                  <Button variant="light" className="p-container-bt"
                  onClick={(e) => handleOnDelete(i._id, e)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
                <Col md={3} style={{ display: 'flex' }}>
                    <div className='div-boxshadow'>Active
                        {i.active === 'un' 
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/setStatusProduct/${i._id}`, {
                              active: 'on'
                            }) 
                            const res = await http.get('/admin/getProducts');
                            setProducts(res.data);
                          }}> <i class="fas fa-times" style={{color: 'red'}}></i></Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/setStatusProduct/${i._id}`, {
                              active: 'un'
                            }) 
                            const res = await http.get('/admin/getProducts');
                            setProducts(res.data);
                          }}>
                            <i class="fas fa-check" style={{color: 'limegreen'}}></i> </Button>
                        }
                    </div>
                    <div className='div-boxshadow'>Roll Top
                        {i.rollTop === 'un' 
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/setStatusProduct/${i._id}`, {
                              rollTop: 'on'
                            }) 
                            const res = await http.get('/admin/getProducts');
                            setProducts(res.data);
                          }}> <i class="fas fa-times" style={{color: 'red'}}></i></Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/setStatusProduct/${i._id}`, {
                              rollTop: 'un'
                            }) 
                            const res = await http.get('/admin/getProducts');
                            setProducts(res.data);
                          }}>
                            <i class="fas fa-check" style={{color: 'limegreen'}}></i> </Button>
                        }
                    </div>
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
