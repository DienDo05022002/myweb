import React from 'react'
import http from '../../api/axiosApi';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AdminLogin = () => {
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
            localStorage.setItem('roleId', 'admin')
          console.log(res.data.accessToken);
          navigate('/dash-board');
        } catch (err) {
          toast.error('email or password not defind');
        }
      };
  return (
    <div style={{height: '600px'}}>
      <div className="container-login">
      <Container className="small-container login-small-container">
        <div>
          <title>Welcome to the regent</title>
        </div>
        <h1 className="my-3">Welcome to the regent</h1>
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
          <div />
        </form>
      </Container>
    </div>
    </div>
  )
}

export default AdminLogin