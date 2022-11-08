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

const AdminPageUsers = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(1)
    useEffect(() => {
        const results = async () => {
          try {
            const res = await http.get('/getAllUsers');
            if(res.data.success)
            setUsers(res.data);
            setRefresh((f) => f+1)

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
      }, [refresh]);
      const results = users.users;
      console.log(results);
  return (
    <div>
              <div className="p-container-product">
        {results &&
          results.map((i) => (
            <ListGroup.Item key={i._id} style={{ paddingTop: '15px' }}>
              <Row className="align-items-center">
                <Col md={3} style={{ display: 'flex' }}>
                    <strong>Tên: {i.name}</strong>
                </Col>
                <Col md={3} style={{ display: 'flex' }}>
                    <strong>Mail: {i.email}</strong>
                </Col>
                <Col md={4} style={{ display: 'flex' }}>
                    <strong>Id người dùng: {i._id}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </div>
    </div>
  )
}

export default AdminPageUsers