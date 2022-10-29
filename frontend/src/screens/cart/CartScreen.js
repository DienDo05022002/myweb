import React from 'react';
import { Store } from '../Store';
import { useContext } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import http from '../../api/axiosApi';

const CartScreen = () => {

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;
  console.log(cartItem);

  const updataCartHandler = async (i, quantiny) => {
    const data = await http.get(`product/${i._id}`);
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...i, quantiny },
    });
  };

  const deleteCartHandler = async (i) => {
    dispatch({
      type: 'CART_DELETE_ITEM',
      payload: i,
    });
  };
  return (
    <div style={{ marginLeft: '50px', marginRight: '10px' }}>
      <div>Giỏ Hàng</div>
      <div>
        <Row>
          <Col md={7}>
            {cartItem.length === 0 ? (
              <div className="cart-empty">
                Giỏ hàng trống <Link to="/">Mua ngay</Link>
              </div>
            ) : (
              <ListGroup style={{ marginTop: '15px' }}>
                {cartItem.map((i) => (
                  <ListGroup.Item key={i._id} style={{ paddingTop: '15px' }}>
                    <Row className="align-items-center">
                      <Col md={4} style={{ display: 'flex' }}>
                        <img
                          src={i.image}
                          alt={i.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <p>
                          <Link to={`/product/${i.slug}`}>{i.name}</Link>
                        </p>
                      </Col>
                      {/* -------Handle quantiny & price & action delete----- */}
                      <Col md={3} style={{ display: 'flex' }}>
                        <Button
                          variant="light"
                          disabled={i.quantiny === 1}
                          onClick={() => updataCartHandler(i, i.quantiny - 1)}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        {/* <Button variant="light">
                                        <i className="fas fa-minus-circle"></i>
                                        </Button> */}
                        <span>{i.quantiny}</span>{' '}
                        <Button
                          variant="light"
                          disabled={i.quantiny === 81}
                          onClick={() => updataCartHandler(i, i.quantiny + 1)}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>
                        <span>${i.price}</span>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          onClick={() => deleteCartHandler(i)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>
                    Hóa đơn:({cartItem.reduce((a, b) => a + b.quantiny, 0)} Sản
                    phẩm) :{' '}
                    <p>
                      $Giá :
                      {cartItem.reduce((a, b) => a + b.price * b.quantiny, 0)}{' '}
                    </p>
                  </h5>
                  <Link to="/ship-address">
                      <Button>Thanh toán</Button>
                    </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartScreen;
