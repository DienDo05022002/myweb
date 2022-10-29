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
    <div className="container-login">
      <div className="login-img">
        <img
          className="w-[100px] aspect-auto mx-auto login-item-img"
          src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/273014318_110262351564677_8425694595742022457_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6wywUtryiOwAX-XLs41&_nc_ht=scontent.fsgn2-7.fna&oh=00_AT-71XOwKtfl5nbB-KVcUdTi0LViLvyK8ze3hfT50uHseA&oe=635792E2"
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
  );
}

export default Login;
