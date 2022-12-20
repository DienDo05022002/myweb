import React from 'react';
import http from '../../../http/axiosApi';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { BsCheckLg } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import {FaShippingFast} from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const res = await http.get('/admin/getAllOrders');
  const orders = await res.data;

  // Pass data to the page via props
  return { props: { orders } };
}

const pageOrders = ({orders}) => {
  const router = useRouter()
  return <div>
    {orders?.order && orders.order.map((i, index) => (
        <Container key={i._id}>
          <ListGroup.Item key={i._id} style={{ paddingTop: '15px' }} className='list-group-box'>
            <div className={
                i.isPaid && i.isDelivered === true ? 'pay-success-fully' : 'pay-not-yet'
            }>
              <Row className="align-items-center">
                <Col md={1} style={{ display: 'flex' }}>
                    <strong>ID order:{index}</strong>
                    {/* <p>{' '}{index}</p> */}
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
                            router.push("/dashboard/orders/pageOrders")
                          }}> <FaTimes/> </Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isPaid: false
                            }) 
                            router.push("/dashboard/orders/pageOrders")
                          }}>
                            <BsCheckLg/> </Button>
                        }
                    </div>
                    <div>
                      {i.isDelivered === false 
                        ? 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isDelivered: true
                            }) 
                            router.push("/dashboard/orders/pageOrders")
                          }}> <FaShippingFast/>
                          </Button> 
                        : 
                          <Button variant="light" className="p-container-bt" onClick={ async () => {
                            http.patch(`/admin/updataOrder/${i._id}`, {
                              isDelivered: false
                            }) 
                            router.push("/dashboard/orders/pageOrders")
                          }}>
                            <BsCheckLg/> </Button>
                        }
                    </div>
                </Col>
                <Col md={1} style={{ display: 'flex' }}>
                  <Link href={`/dashboard/orders/${i._id}`} className='linkDetail-order'>
                    <strong>Detail</strong>
                  </Link>
                </Col>
              </Row>
            </div>
            </ListGroup.Item>
        </Container>
    ))}
  </div>;
};

export default pageOrders;
