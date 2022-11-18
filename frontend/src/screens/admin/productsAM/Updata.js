import React from 'react';
import '../index.css'
import { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import http from '../../../api/axiosApi';
const Updata = () => {
  const params = useParams();
  const id  = params.id
  console.log(id)
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    category: "",
    image: "",
    price: "",
    discount: "",
    countIn: "",
    rating: "",
    numReviews: "",
    description: "",
  });
  const [image, setImage] = useState([]);
  useEffect(() => {
    (async (id) => {
      try {
        const res = await http.get(`/admin/getByIdProducts/${id}`);
        if (res.data.success) {
          // console.log(res.data.product)
          const {name,slug,category,image,price,discount,countIn,rating,numReviews,description} = res.data.product;
          setProduct({
            ...product,
            name,slug,category,image,price,discount,countIn,rating,numReviews,description,
          })
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);
  console.log(product)

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  //handle updata
  const cloudinaryRef = useRef();
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const file = await uploadFile(image);
    // console.log(image);

    const newProduct = {
      image: image,
      ...product,
    };
    
    try {
      const res = await http.patch(`/admin/updataProducts/${id}`, newProduct);
      if (res.data.success) console.log(res.data);
      toast.success('Updata Successfully')
      navigate('/admin-page/products');
    } catch (err) {
      toast.error('Faild');
      console.log({err})
    }
  };
  return <div>
  <h3>Updata product {id}</h3>
  <div style={{ display: 'flex' }} className='container--updata'>
    <form onSubmit={handleSubmit} className='container-form'>
            <Form.Group>
              <Form.Control
                id="name"
                value={product.name}
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
                value={product.slug}
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
                value={product.category}
                onChange={handleChange}
                type="text"
                placeholder="danh mục"
                name="category"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            ------------------------------
            <Form.Group>
              <Form.Control
                id="price"
                value={product.price}
                onChange={handleChange}
                type="text"
                placeholder="giá"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="discount"
                value={product.discount}
                onChange={handleChange}
                type="text"
                placeholder="giảm giá"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="countIn"
                value={product.countIn}
                onChange={handleChange}
                type="text"
                placeholder="tích điểm"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="rating"
                value={product.rating}
                onChange={handleChange}
                type="text"
                placeholder="sao"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Form.Control
                id="numReviews"
                value={product.numReviews}
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
                value={product.description}
                onChange={handleChange}
                type="text"
                placeholder="Mô tả"
                className='container-form-input'
              ></Form.Control>
            </Form.Group>
            --
            <Form.Group>
              <Button variant="success" type="submit">
                Updata Product
              </Button>
            </Form.Group>
          </form>
          <div>
            <button onClick={handleUploadWidget}>upload</button>
            <img src={product.image} alt="-Ảnh" className='img-form'/>
          </div>
      </div>
    </div>;
};

export default Updata;
