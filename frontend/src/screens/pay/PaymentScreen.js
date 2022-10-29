import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import Checkout from '../../components/Checkout';
import {Store} from '../Store'

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/ship-address');
    }
  }, [shippingAddress, navigate]);

  const [pay, setPay] = useState()
  console.log(pay)

  const selectorPayHandler = (e) => {
    localStorage.setItem('selectorPaymentMethod', pay);
    navigate('/place-order');
  }
  return (
    <div>PaymentScreen
      <Checkout step1 step2 step3/>
      <div className="container small-container">
        
        <h2 className="my-3">Thanh toán bằng</h2>
        <Form onSubmit={selectorPayHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="ZaloPay"
              label="ZaloPay"
              value="ZaloPay"
              checked={pay === 'ZaloPay'}
              onChange={(e) => setPay(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="MoMo"
              label="Ví MoMo"
              value="MoMo"
              checked={pay === 'MoMo'}
              onChange={(e) => setPay(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentScreen