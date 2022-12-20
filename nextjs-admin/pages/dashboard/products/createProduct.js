import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import http from '../../../http/axiosApi';
import { useRef } from 'react';
import { useRouter } from 'next/router';

const createProduct = () => {
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
    reviews: '',
  });
  const [image, setImage] = useState();
  const [active, setActive] = useState('on');
  const [rollTop, setRollTop] = useState('un');
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  // console.log(typeof active)
  // console.log(image);
  const router = useRouter();
  const handleChange = (e) => {
    setFormP((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  //   const navigate = useNavigate();

  //Upload image Widget
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleUploadWidget(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'jr0m4p9w');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dvz7vll4o/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json());
    setImage(data.secure_url);
    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);

    const newProduct = {
      ...formP,
      image: image,
      active: active,
      rollTop: rollTop,
    };
    console.log(newProduct);
    try {
      const res = await http.post('/admin/addProduct', newProduct);
      if (res.data.success) console.log(res.data);
      router.push('/dashboard/products/pageProducts');
      toast.success('Create new product successfully');
    } catch (err) {
      toast.error('Fail !!!');
      console.log({ err });
    }
  };
  return (
    <div>
      <h1 className="my-3">Thêm mới sản phẩm</h1>
      <div style={{ display: 'flex' }} className="container-main">
        <form onSubmit={handleSubmit} className="container-form">
          <Form.Group>
            <Form.Control
              id="name"
              value={formP.name}
              onChange={handleChange}
              type="text"
              placeholder="Tên sản phẩm"
              name="name"
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
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
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <div style={{ display: 'flex', marginBottom: '40px' }}>
            <div style={{ display: 'flex' }}>
              <p
                style={{
                  paddingRight: '20px',
                  paddingLeft: '20px',
                  marginBottom: '0',
                  marginTop: '3px',
                }}
              >
                Post Now
              </p>
              <select
                value={active}
                onChange={(e) => {
                  setActive(e.target.value);
                }}
                className={
                  active === 'un'
                    ? 'container-form-select-red'
                    : 'container-form-select-green'
                }
              >
                <option value="on">true</option>
                <option value="un">false</option>
              </select>
            </div>
            <p
              style={{
                paddingRight: '20px',
                paddingLeft: '20px',
                marginBottom: '0',
                marginTop: '3px',
              }}
            >
              Insert roll top
            </p>
            <select
              value={rollTop}
              onChange={(e) => {
                setRollTop(e.target.value);
              }}
              className={
                rollTop === 'un'
                  ? 'container-form-select-red'
                  : 'container-form-select-green'
              }
            >
              <option value="on">true</option>
              <option value="un">false</option>
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
          {/* <button onClick={handleUploadWidget}>upload</button>
            <img src={image} alt="-Ảnh" className='img-form'/> */}
          <form
            method="post"
            onChange={handleOnChange}
            onSubmit={handleUploadWidget}
          >
            <p>
              <input type="file" name="file" />
            </p>

            <img src={imageSrc} className="img-form" />

            {imageSrc && !uploadData && (
              <p>
                <button>Lưu ảnh này</button>
              </p>
            )}
            {image !== undefined ? <div>Đã lưu</div> : null}

            {/* {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default createProduct;
