import React from 'react';
import '../index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useReducer, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import http from '../../../api/axiosApi';

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get(`/admin/getOrderById/${id}`);
        setOrderDetail(res.data);
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
  }, [id]);
  console.log(orderDetail);
  const orderD = orderDetail.order;
  console.log(orderD);
  console.log(orderD?.customerOders)
  // const {orderD: [customerOders]} = orderD
  // console.log([customerOders])
  return (
    <>
      <div className="orderD-container">
        <div className="orderD-container-code">
          <p>
            <label className="container-form-label">Id order:</label>
            {orderD && orderD?._id}
          </p>
          <p>
            <label className="container-form-label">Create order</label>
            {orderD && orderD?.createdAt}
          </p>
          <p>
            <label className="container-form-label">Id User:</label>
            {orderD && orderD?.userId}
          </p>
        </div>
        <div className="orderD-container-user">
          <p>
            <label className="container-form-label">Name: </label>
            {orderD && orderD?.customerInformation.fullName}
          </p>
          <p>
            <label className="container-form-label">Address: </label>
            {orderD && orderD?.customerInformation.address}
          </p>
          <p>
            <label className="container-form-label">Phone: </label>
            {orderD && orderD?.customerInformation.phone}
          </p>
          <p>
            <label className="container-form-label">Note: </label>
            {orderD && orderD?.customerInformation.note}
          </p>
        </div>
        <div className="orderD-container-status">
          <p>
            <label className="container-form-label">Total orders: </label>
            {orderD && orderD?.totalOrders}₫
          </p>
          <p>
            <label className="container-form-label">Pay: </label>
            {orderD && orderD?.methodPay}
          </p>
          <p style={{display: 'flex'}}>
            <label className="container-form-label">Paid:</label>
            {orderD && orderD?.isPaid === true ? <div className="container-form-paidS">Paid successfully </div> : <div className="container-form-unpaid">Unpaid</div>}
            {orderD && orderD?.isPaid === true
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${orderD._id}`, {
                              isPaid: false
                            }) 
                            const res = await http.get(`/admin/getOrderById/${id}`);
                            setOrderDetail(res.data);
                          }}> <i class="fas fa-check" style={{color: 'limegreen'}}></i></Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${orderD._id}`, {
                              isPaid: true
                            }) 
                            const res = await http.get(`/admin/getOrderById/${id}`);
                            setOrderDetail(res.data);
                          }}>
                            <i class="fas fa-times" style={{color: 'red'}}></i> </Button>
            }
          </p>
          <p style={{display: 'flex'}}>
            <label className="container-form-label">Delivered</label>
            {orderD && orderD?.isDelivered === true ? <div className="container-form-paidS">Delivered successfully </div> : <div className="container-form-unpaid">Undelivered</div>}
            {orderD && orderD?.isDelivered === true
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${orderD._id}`, {
                              isDelivered: false
                            }) 
                            const res = await http.get(`/admin/getOrderById/${id}`);
                            setOrderDetail(res.data);
                          }}> <i class="fas fa-check" style={{color: 'limegreen'}}></i></Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${orderD._id}`, {
                              isDelivered: true
                            }) 
                            const res = await http.get(`/admin/getOrderById/${id}`);
                            setOrderDetail(res.data);
                          }}>
                            <i class="fas fa-times" style={{color: 'red'}}></i> </Button>
            }
          </p>
        </div>
        <div>
          <strong>Customer orders:</strong>
          {orderD && orderD?.customerOders?.map((o , i) => (
            <div key={i} className='container-form-orders'>
              <div>
                <p>
                  <label className="container-form-label-order">Name: </label>
                  {o.name}
                </p>
                <p>
                  <label className="container-form-label-order">Category: </label>
                  {o.category}
                </p>
                <p>
                  <label className="container-form-label-order">Price: </label>
                  {o.price}
                </p>
                <p>
                  <label className="container-form-label-order">Quantiny: </label>
                  {o.quantiny}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="orderD-container-order">
          <p>
            <label className="container-form-label">Total orders: </label>
            {orderD && orderD?.customerOders.name}
          </p>
          <p>
            <label className="container-form-label">Total orders: </label>
            {orderD && orderD?.customerOders.name}
          </p>
          <p>
            <label className="container-form-label">Total orders: </label>
            {orderD && orderD?.customerOders.name}
          </p>
          <p>
            <label className="container-form-label">Total orders: </label>
            {orderD && orderD?.customerOders.name}
          </p>
        </div> */}
        <Form.Group>
          <Form.Control
            id="name"
            // value={product.name}
            // onChange={handleChange}
            type="text"
            placeholder="Tên sản phẩm"
            name="name"
            className="container-form-input"
          ></Form.Control>
        </Form.Group>
      </div>
    </>
  );
};

export default OrderDetail;
