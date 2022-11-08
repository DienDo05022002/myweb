import React from 'react';
import http from '../../../api/axiosApi';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Create = () => {
  const [formP, setFormP] = useState({
    name: '',
    slug: '',
    category: '',
    image: '',
    price: '',
    discount: '',
    countIn: '',
    rating: '',
    numReviews: '',
    description: '',
  });
  const uploadImage = (files) => {
    console.log(files[0]);
  };
  const handleChange = (e) => {
    setFormP((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formP);
    try {
      const res = await http.post('/products', formP);
      if (res.data.success) console.log(res.data);

      // navigate('/');
    } catch (err) {
      toast.error('email or password not defind');
    }
  };
  return (
    <div>
      <div className="small-container">
        <h1 className="my-3">Thêm mới sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              value={formP.name}
              onChange={handleChange}
              type="text"
              placeholder="Tên sản phẩm"
              name="name"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="slug"
              value={formP.slug}
              onChange={handleChange}
              type="slug"
              placeholder="slug"
              name="slug"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="category"
              value={formP.category}
              onChange={handleChange}
              type="text"
              placeholder="category"
              name="category"
            ></Form.Control>
          </Form.Group>
          ------------------------------
          <input
            type="file"
            name="file"
            action={'http://localhost:3010/v1/products'}
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <Form.Group>
            <Form.Control
              id="price"
              value={formP.price}
              onChange={handleChange}
              type="number"
              placeholder="giá"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="discount"
              value={formP.discount}
              onChange={handleChange}
              type="number"
              placeholder="giảm giá"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="countIn"
              value={formP.countIn}
              onChange={handleChange}
              type="number"
              placeholder="tích điểm"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="rating"
              value={formP.rating}
              onChange={handleChange}
              type="number"
              placeholder="sao"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="numReviews"
              value={formP.numReviews}
              onChange={handleChange}
              type="text"
              placeholder="Review"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              id="description"
              value={formP.description}
              onChange={handleChange}
              type="text"
              placeholder="Mô tả"
            ></Form.Control>
          </Form.Group>
          --


          <Form.Group>
            <Button variant="success" type="submit">
              Theem
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default Create;
