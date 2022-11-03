import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useContext, useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import Checkout from '../../components/Checkout';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ShipScreen = () => {
  const storeUser = localStorage.getItem('user');
  const storeTokens = localStorage.getItem('tokens');
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [address, setAddress] = useState(shippingAddress.address || '');

  useEffect(() => {
    if (!storeUser && !storeTokens) {
      navigate('/login?redirect=/ship-address');
    }
  }, [storeUser,storeTokens,navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!storeFullName && !storePhone && !storeAddress)
    dispatch({
      type: 'SHIPPING_ADDRESS',
      payload: { fullName, phone, address },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, phone, address })
    );
    navigate('/payment');
    //------------------------------------------------------------
  };
  return (
    <div className="shipping-main">
      <Checkout step1 step2 />
      <h1 className="my-3 ship-title">Điền thông tin ship hàng</h1>
      <div className="container small-container">
        <form onSubmit={handleSubmit}>
          {/* ------------------------------------------------------------ */}
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Họ tên"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* ------------------------------------------------------------ */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group> */}
          {/* ------------------------------------------------------------ */}
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* ------------------------------------------------------------ */}
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="000 Nguyễn Tất Thành, Hải Châu"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* ------------------------------------------------------------ */}
          <FloatingLabel label="Ghi chú! Nếu có...">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <div className="mb-3">
            <Button variant="success" type="submit" className="ship-button">Gửi
              {/* <Link to="/payment" className="ship-button-link">Gửi</Link> */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipScreen;
