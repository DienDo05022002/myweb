import React, { useContext, useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';

const ProfileUser = () => {
  const navigate = useNavigate();
  const storeUser = localStorage.getItem('user');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [email, setEmail] = useState(storeUser || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!storeUser ) {
      navigate('/login');
    }
  }, [storeUser ,navigate]);
  return (
    <div>
         <div className="container small-container">
      <h1 className="my-3">Tài khoản</h1>
      <form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Tên</Form.Label>
          <Form.Control
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Hoàn thành</Button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default ProfileUser