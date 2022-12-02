import React from 'react'
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

const OverViewOrders = () => {
    const [orders, setOrders] = useState([])
    // const [isPaid, setIsPaid] = useState(false)

    // const checkOrderHandle = async (id) => {
    //   console.log(id)
    //   setIsPaid(true)
    //   const newPatch = {
    //     isPaid: isPaid,
    //     // isDelivered: isDelivered
    //   };
    //   console.log(newPatch)
    //   try {
    //     const res = await http.patch(`/admin/updataOrder/${id}`, newPatch);
    //     if (res.data.success) console.log(res.data);
    //     await http.get('/admin/getAllOrders');
    //     toast.success('Paid Successfully')
    //   } catch (err) {
    //     toast.error('Faild');
    //     console.log({err})
    //   }
    // }
    // const handleAgain = async (id) => {
    //   setIsPaid(false)
    //   const newPatch = {
    //     isPaid: isPaid,
    //     // isDelivered: isDelivered
    //   };
    //   console.log(newPatch)
    //   try {
    //     const res = await http.patch(`/admin/updataOrder/${id}`, newPatch);
    //     if (res.data.success) console.log(res.data);
    //     await http.get('/admin/getAllOrders');
    //     toast.success('Patch')
    //   } catch (err) {
    //     toast.error('Faild');
    //     console.log({err})
    //   }
    // }
    const dayOrder = orders.order
    // const day = dayOrder.getDate()
    // console.log(dayOrder.createdAt)

    useEffect(() => {
        const results = async () => {
          try {
            const res = await http.get('/admin/getAllOrders');
            setOrders(res.data);
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
      console.log(orders.order)
  return (
    <div>
        <div>
        <div className="p-container-product">
        <tr>
          <th style={{width:'343px'}}>ID</th>
          <th style={{width:'343px'}}>Mail</th>
          <th style={{width:'343px'}}>Create Order</th>
          <th style={{width:'228px'}}>Confirm
            <div className='table-confirm'>
              <tr className='table-confirm-tr'>Paid</tr>
              <tr className='table-confirm-tr'>Delivered</tr>
            </div>
          </th>
        </tr>

        {orders.order &&
          orders.order.map((i) => (
            <ListGroup.Item key={i._id} style={{ paddingTop: '15px' }} className='list-group-box'>
            <div className={
                i.isPaid && i.isDelivered === true ? 'pay-success-fully' : 'pay-not-yet'
            }>
              <Row className="align-items-center">
                <Col md={3} style={{ display: 'flex' }}>
                    <strong>ID order:</strong>
                    <p>{' '}{i._id}</p>
                </Col>
                {/* ------------ */}
                <Col md={3} style={{ display: 'flex' }}>
                  <i class="fas fa-user"></i>
                  <p>{i.user}</p>
                </Col>
                <Col md={3} style={{ display: 'flex' }}>
                  <i class="fas fa-calendar-day "></i>
                  <p>{i.createdAt.substring(0, 10)}</p>
                  <p> {'*'} ({i.createdAt.substring(11, 19)})</p>
                </Col>
                <Col md={2} style={{ display: 'flex' }}>
                    <div>
                        {i.isPaid === false 
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isPaid: true
                            }) 
                            const res = await http.get('/admin/getAllOrders');
                            setOrders(res.data);
                          }}> <i class="fas fa-times" style={{color: 'red'}}></i></Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isPaid: false
                            }) 
                            const res = await http.get('/admin/getAllOrders');
                            setOrders(res.data);
                          }}>
                            <i class="fas fa-check" style={{color: 'limegreen'}}></i> </Button>
                        }
                    </div>
                    <div>
                      {i.isDelivered === false 
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isDelivered: true
                            }) 
                            const res = await http.get('/admin/getAllOrders');
                            setOrders(res.data);
                          }}> <i class="fas fa-shipping-fast" style={{color: 'red'}}></i>
                          </Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isDelivered: false
                            }) 
                            const res = await http.get('/admin/getAllOrders');
                            setOrders(res.data);
                          }}>
                            <i class="fas fa-check" style={{color: 'limegreen'}}></i> </Button>
                        }
                    </div>
                </Col>
                <Col md={1} style={{ display: 'flex' }}>
                  <Link to={`/admin-page/orderDetail/${i._id}`} className='linkDetail-order'>
                    <strong>Detail</strong>
                  </Link>
                </Col>
              </Row>
            </div>
            </ListGroup.Item>
          ))}
      </div>
        </div>
    </div>
  )
}

export default OverViewOrders