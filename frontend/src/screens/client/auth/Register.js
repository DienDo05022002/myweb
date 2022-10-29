import React from 'react';
import './index.css';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import http from '../../../api/axiosApi';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confiemPassword: '',
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await http.post('/register', user);
      if (res.data.success)

        localStorage.setItem('tokens', res.data.accessToken);
        localStorage.setItem('user', user.email);

      alert('Đăng ky thành công');
      navigate('/');
    } catch (err) {
      toast.error('email or password not defind');
    }
  };
  return (
    <div className="text-[#333] w-full py-2">
      <Container className="small-container">
        <h1 className="my-3">Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              value={user.name}
              onChange={handleChange}
              type="text"
              placeholder="Họ tên"
              name="name"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              placeholder="Mật khẩu"
              name="password"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="confiemPassword"
              value={user.confiemPassword}
              onChange={handleChange}
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="password"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Button variant="success" type="submit">
              Đăng ký
            </Button>
          </Form.Group>
          <p>
            Nếu đã có tài khoản, về trang{' '}
            <Link to={`/`}>
              Đăng nhập
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
}
