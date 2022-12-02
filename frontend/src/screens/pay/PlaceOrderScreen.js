import React from 'react';
import { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import Checkout from '../../components/Checkout';
import http from '../../api/axiosApi';
import LoadingBox from '../../components/LoadingBox';

//Config Socket.io
import { io } from 'socket.io-client';
const socketServerUrl = 'http://localhost:3010';

const config = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 10,
};

const socket = io(socketServerUrl, config);

const PlaceOrderScreen = () => {
  const storeUser = localStorage.getItem('user');
  const storeShippingAddress = localStorage.getItem('shippingAddress');
  const storePay = localStorage.getItem('selectorPaymentMethod');

  const { state, dispatch } = useContext(Store);
  // console.log(dispatch)
  const {
    cart: { cartItem, shippingAddress },
  } = state;
  // const customerOders = cartItem.map((x) => ({...x, product: x._id}))
  // console.log(cartItem._id)
  // const [placeOrder , setPlaceOrder] = useState([])

  console.log(shippingAddress);
  // console.log(storeShippingAddress)
  // console.log(cartItem);
  // console.log(storeUser);
  // console.log(storePay);

  const totalRound1 = cartItem.reduce((a, b) => a + b.price * b.quantiny, 0);
  const countInPoin = cartItem.reduce((a, b) => a + b.discount, 0);
  // const totalRound2 = totalRound1 + 0;
  console.log(totalRound1)
  console.log(countInPoin)

  const totalOrder = useMemo(() => {
    return cartItem.reduce((final, item) => {
      final +=
        (item.price - item.price * (item.discount / 100)) * item.quantiny
        return final
      }, 0);
  }, [cartItem])
  // console.log("totalOrder::" + totalOrder)
  const discountOrder = useMemo(() => {
    return cartItem.reduce((final, item) => {
      final +=
        (item.price * (item.discount / 100)) * item.quantiny
        return final
      }, 0);
  }, [cartItem])
  // console.log("discountOrder:: "+ discountOrder)

  //Check
  const navigate = useNavigate();
  useEffect(() => {
    if (!storePay) {
      navigate('/ship-address');
    }
  }, [storePay, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await http.post('/orders', {
        user: storeUser,
        customerOders: cartItem,
        customerInformation: shippingAddress,
        methodPay: storePay,
        totalOrders: totalOrder,
      });
      //Socket emit
      console.log(res.data)
      socket.emit('client-message', { message:"You have new orders",newOrder:res.data });
      if(res.data.success)
      console.log(res.data.success)
      localStorage.removeItem('cartItems')
      dispatch({type:'CLEAR_CART'})
      // navigate(`/orders/${res.order._id}`)
      navigate('/thankyou')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-3">
      PlaceOrderScreen
      <Checkout step1 step2 step3 step4 />
      <div className="mb-3 PlaceOrderScreen">
        <h2>Checks đơn</h2>
        <Row>
          <Col md={8}>
            {/* ---------------------------------------------------- */}
            <Card className="mb-5">
              <Card.Body>
                <Card.Title>Thông tin của bạn</Card.Title>
                <Card.Text>
                  {/* <strong>Tên:</strong> {storeShippingAddress} <br /> */}
                  <strong>Tên:</strong> {shippingAddress.fullName} <br />
                  <strong>Địa chỉ: </strong> {shippingAddress.address}{' '}
                  <br />
                  <strong>Số điện thoại: </strong> {shippingAddress.phone}{' '}
                  <br />
                  <br />
                  <strong>Ghi chú cho shipper: </strong> {shippingAddress.note}{' '}
                  <br />
                </Card.Text>
                <Link to="/ship-address" className="place--order--button">Sửa</Link>
              </Card.Body>
            </Card>
            {/* ---------------------------------------------------- */}
            <Card className="mb-5">
              <Card.Body>
                <Card.Title>Thanh toán bằng</Card.Title>
                <strong>Ví điện tử: </strong>
                <Card.Text>{storePay}</Card.Text>
                <Link to="/payment" className="place--order--button">Sửa</Link>
              </Card.Body>
            </Card>
            {/* ---------------------------------------------------- */}
            <Card className="mb-5">
              <Card.Body>
                <Card.Title>Sản phẩm</Card.Title>
                <ListGroup variant="flush">
                  {cartItem.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{' '}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        {/* <Col md={3}>
                          <span>Quantity:{item.quantity}</span>
                        </Col> */}
                        <Col md={3}><span className='icon-price'>₫</span>{item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                  {/* ---------------------------------------------------- */}
                </ListGroup>
                <Link to="/cart" className="place--order--button">
                  Sửa
                </Link>
              </Card.Body>
            </Card>
          </Col>
          {/* -------------------------------------------------------------------------------------------------------- */}
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Hóa đơn của bạn</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Tổng</Col>
                      <Col>
                        {totalRound1}
                        <span className='icon-price'>₫</span>
                      </Col>
                      {/* {cartItem.price} */}
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Phí ship</Col>
                      <Col>Miễn phí</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Giảm giá</Col>
                      <Col>{discountOrder}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tích điểm</Col>
                      <Col>
                        {countInPoin}
                        {'.điểm '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Thành tiền</strong>
                      </Col>
                      <Col>
                        <strong>
                          {totalOrder}
                          <span className='icon-price'>₫</span>
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cartItem.length === 0}
                      >
                        Đặt hàng
                      </Button>
                    </div>
                    {/* {loading && <LoadingBox></LoadingBox>} */}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
