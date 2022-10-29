import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Checkout = (props) => {
  return (
    <Row className="checkout-steps checkout-steps-div">
      <Col className={props.step1 ? 'active' : ''} style={{ display: 'flex', justifyContent: 'center' }}>Đăng-Nhập</Col>
      <Col className={props.step2 ? 'active' : ''} style={{ display: 'flex', justifyContent: 'center' }}>Điền-thông-tin</Col>
      <Col className={props.step3 ? 'active' : ''} style={{ display: 'flex', justifyContent: 'center' }}>Thanh-toán</Col>
      <Col className={props.step4 ? 'active' : ''} style={{ display: 'flex', justifyContent: 'center' }}>Đặt-hàng</Col>
    </Row>
  )
}

export default Checkout