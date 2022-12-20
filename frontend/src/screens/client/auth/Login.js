import React from 'react';
import './index.css';
import Axios from 'axios';
import http from '../../../api/axiosApi';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      throw new Error('email or password not defind');
    }
    console.log(user.email, user.password);

    try {
      const res = await http.post('/login', user);
      if (res.data.success)
        localStorage.setItem('tokens', res.data.accessToken);
        localStorage.setItem('user', user.email) // khi login xong, lưu email vào localStorage rồi vào giao diện chính lấy ra để làm username cho người dùng
      console.log(res.data.accessToken);
      navigate('/');
    } catch (err) {
      toast.error('email or password not defind');
    }
  };

  return (
    <div>
      <div className="container-login">
      <div className="login-img">
        <img
          className="w-[100px] aspect-auto mx-auto login-item-img"
          src="https://res.cloudinary.com/dvz7vll4o/image/upload/v1668919364/images-product/biiogww4cp9gfydz74rg.jpg"
          alt="logo"
        />
      </div>
      <Container className="small-container login-small-container">
        <div>
          <title>Đăng nhập</title>
        </div>
        <h1 className="my-3">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              id="email"
              value={user.email}
              onChange={handleChange}
              type="text"
              placeholder="Email"
              name="email"
            ></Form.Control>
          </Form.Group>
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
          <Form.Group>
            <Button variant="success" type="submit">
              Đăng nhập
            </Button>
          </Form.Group>
          {/* <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div> */}
          Bạn chưa có tài khoản?{' '}
          <Link className="text-blue-400" to="/register">
            Đăng ký ngay
          </Link>
          <div />
        </form>
      </Container>
      </div>
    {/* <div className='admin-login'>
        <strong className='admin-title-login'>You are Admin pages</strong>
        <Button className='admin-bt-login' variant="dark">
            <Link to='/admin-login' className='admin-link-login'>Login</Link>
        </Button>
    </div> */}
    </div>
  );
}

export default Login;
