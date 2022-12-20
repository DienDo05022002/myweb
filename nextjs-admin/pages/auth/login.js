import React from 'react';
import Form from 'react-bootstrap/Form';
import http from '../../http/axiosApi';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import Cookies  from 'js-cookie'

const Login = ({token}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      throw new Error('email or password not defind');
    }
    console.log(user.email, user.password);

    try {
      const res = await http.post('/login', user);
      if (res.data.success)
        Cookies.set('tokens', res.data.accessToken);
        Cookies.set('user', user.email) // khi login xong, lưu email vào Cookies vào giao diện chính lấy ra để làm username cho người dùng
        Cookies.set('roleId', 'admin')
        router.push("/dashboard")
      console.log(res.data.accessToken);
      // navigate('/dash-board');
    } catch (err) {
      toast.error('email or password not defind');
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group>
            <Button variant="success" type="submit">
              Đăng nhập
            </Button>
          </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;

export async function getServerSideProps({req, res}) {
  const token = req.cookies.token
  console.log(token)
  return {
    props: {token},
  }
}
