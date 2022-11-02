import React from 'react';
import { useContext, useEffect, useState } from 'react';
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

const PlaceOrderScreen = () => {
  const storeUser = localStorage.getItem('user');
  const storeShippingAddress = localStorage.getItem('shippingAddress');
  const storePay = localStorage.getItem('selectorPaymentMethod');

  const { state, dispatch } = useContext(Store);
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
  const countInPoin = cartItem.reduce((a, b) => a + b.countIn, 0);
  const totalRound2 = totalRound1 + 0;
  //Check
  const navigate = useNavigate();
  useEffect(() => {
    if (!storePay) {
      navigate('/ship-address');
    }
  }, [storePay, navigate]);

  const placeOrderHandler = async () => {
    // try {
    //   const res = await http.post('/orders',{
    //     user: storeUser,
    //     customerOders: cartItem,
    //     customerInformation: shippingAddress,
    //     methodPay: storePay,
    //     totalOrders: totalRound2
    //   })
    //   console.log(res.orders._id)
    //   if(res.data.success) {
    //     localStorage.removeItem('cartItems')
    //     navigate(`/orders/${res.orders._id}`)
    //     console.log(res.orders._id)
    //   }
    // } catch(err) {
    //   toast.error('Đơn hàng không hợp lệ')
    // }
    try {
      const res = await http.post('/orders', {
        user: storeUser,
        customerOders: cartItem,
        customerInformation: shippingAddress,
        methodPay: storePay,
        totalOrders: totalRound2,
      });
      console.log(res.data)
      if(res.data.success)
      console.log(res.data.success)
      // dispatch({type:'CLEAR_CART'})
      // localStorage.removeItem('cartItems')
      navigate(`/orders/${res.order._id}`)
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
                  <strong>Tên:</strong> {storeShippingAddress} <br />
                  <strong>Tên:</strong> {shippingAddress.fullName} <br />
                  <strong>Địa chỉ: </strong> {shippingAddress.address}{' '}
                  <br />
                  <strong>Số điện thoại: </strong> {shippingAddress.phone}{' '}
                  <br />
                </Card.Text>
                <Link to="/ship-address">Sửa</Link>
              </Card.Body>
            </Card>
            {/* ---------------------------------------------------- */}
            <Card className="mb-5">
              <Card.Body>
                <Card.Title>Thanh toán bằng</Card.Title>
                <strong>Ví điện tử: </strong>
                <Card.Text>{storePay}</Card.Text>
                <Link to="/payment">Sửa</Link>
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
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
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
                        {'.000 '}
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
                      <Col>0</Col>
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
                          {totalRound2}
                          {'.000 '}
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
