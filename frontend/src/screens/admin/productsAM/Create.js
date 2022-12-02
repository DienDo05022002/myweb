import React from 'react';
import '../index.css'
import { useRef } from 'react';
import http from '../../../api/axiosApi';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../api/axiosApi';

const Create = () => {
  const [formP, setFormP] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    discount: '',
    countIn: '',
    rating: '',
    numReviews: '',
    description: '',
    // active: true,
    // rollTop: false
  });
  const [image, setImage] = useState([]);
  const [active, setActive] = useState('on')
  const [rollTop, setRollTop] = useState('un')
  // const T = true
  // const F = false
  console.log(typeof active)
  console.log(formP);
  const handleChange = (e) => {
    setFormP((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const navigate = useNavigate();

  //Upload image Widget
  const cloudinaryRef = useRef();
  // const widgetRef = useRef();
  const handleUploadWidget = () => {
    cloudinaryRef.current = window.cloudinary;
    const myUpload = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dvz7vll4o',
        upload_preset: 'jr0m4p9w',
      },
      function (error, result) {
        if (result.event === 'success') setImage(result.info.secure_url);
        return;
      }
    );
    myUpload.open();
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const file = await uploadFile(image);
    console.log(image);

    const newProduct = {
      image: image,
      ...formP,
      active: active
    };
    try {
      const res = await http.post('/admin/addProduct', newProduct);
      if (res.data.success) console.log(res.data);
      navigate('/admin-page/products');
      toast.success('Create new product successfully')
    } catch (err) {
      // toast.error('email or password not defind');
      console.log({err})
    }
  };
  return (
    <div>
      <div>
        <h1 className="my-3">Thêm mới sản phẩm</h1>
        <div style={{display: 'flex'}} className='container-main'>
          <form onSubmit={handleSubmit} className='container-form'>
            <Form.Group>
              <Form.Control
                id="name"
                value={formP.name}
                onChange={handleChange}
                type="text"
                placeholder="Tên sản phẩm"
                name="name"
                className='container-form-input'
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
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="category"
                value={formP.category}
                onChange={handleChange}
                type="text"
                placeholder="danh mục"
                name="category"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="price"
                value={formP.price}
                onChange={handleChange}
                type="number"
                placeholder="giá"
                className='container-form-input'
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
                className='container-form-input'
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
                className='container-form-input'
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
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="numReviews"
                value={formP.numReviews}
                onChange={handleChange}
                type="text"
                placeholder="quan tâm"
                className='container-form-input'
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
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <div style={{ display: 'flex', marginBottom: '40px'}}>
              <div style={{ display: 'flex'}}>
              <p style={{ paddingRight: '20px', paddingLeft: '20px', marginBottom: '0', marginTop: '3px' }}>Post Now</p>
              <select value={active}
              onChange={(e) => {
                setActive(e.target.value)
              }}
              className={active === 'un' ? 'container-form-select-red' : 'container-form-select-green'}
              >
                <option value='on'>true</option>
                <option value='un'>false</option>
              </select>
              </div>
              <p style={{ paddingRight: '20px', paddingLeft: '20px', marginBottom: '0', marginTop: '3px' }}>Insert roll top</p>
              <select value={rollTop}
              onChange={(e) => {
                setRollTop(e.target.value)
              }}
              className={rollTop === 'un' ? 'container-form-select-red' : 'container-form-select-green'}
              >
                <option value='on'>true</option>
                <option value='un'>false</option>
              </select>
            </div>
            <Form.Group>
            --
              <Button variant="success" type="submit">
                Tạo
              </Button>
            </Form.Group>
          </form>
          <div>
            <button onClick={handleUploadWidget}>upload</button>
            <img src={image} alt="-Ảnh" className='img-form'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
