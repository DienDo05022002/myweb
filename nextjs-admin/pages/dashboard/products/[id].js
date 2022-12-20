import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import http from '../../../http/axiosApi';

export async function getStaticPaths() {
  const res = await http.get('/products');
  // const data = await res.json();
  const paths = res?.data?.map((p) => ({
    params: { id: p._id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await http.get(`/admin/getByIdProducts/${id}`);
  const data = await res.data;
  return {
    props: {
      results: data,
    },
  };
}

const Updata = ({ results }) => {
  const getId = results.product._id;
  console.log(getId);
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    category: '',
    image: '',
    price: 0,
    discount: 0,
    countIn: 0,
    rating: 0,
    numReviews: 0,
    description: '',
  });
  const [image, setImage] = useState([]);
  useEffect(() => {
    (async (getId) => {
      try {
        const res = await http.get(`/admin/getByIdProducts/${getId}`);
        if (res.data.success) {
          // console.log(res.data.product)
          const {
            name,
            slug,
            category,
            image,
            price,
            discount,
            countIn,
            rating,
            numReviews,
            description,
          } = res.data.product;
          setProduct({
            ...product,
            name,
            slug,
            category,
            image,
            price,
            discount,
            countIn,
            rating,
            numReviews,
            description,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })(getId);
  }, [getId]);
  console.log(product);

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
  // const navigate = useNavigate();
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
      toast.success('Updata Successfully');
      // navigate('/admin-page/products');
    } catch (err) {
      toast.error('Faild');
      console.log({ err });
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }} className="container--updata">
        <form onSubmit={handleSubmit} className="container-form">
          <Form.Group>
            <Form.Control
              value={product.name}
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
              value={product.slug}
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
              value={product.category}
              onChange={handleChange}
              type="text"
              placeholder="danh mục"
              name="category"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          ------------------------------
          <Form.Group>
            <Form.Control
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="giá"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="giảm giá"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              name="countIn"
              value={product.countIn}
              onChange={handleChange}
              placeholder="tích điểm"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              name="rating"
              value={product.rating}
              onChange={handleChange}
              placeholder="sao"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              name="numReviews"
              value={product.numReviews}
              onChange={handleChange}
              placeholder="quan tâm"
              className="container-form-input"
            ></Form.Control>
          </Form.Group>
          --
          <Form.Group>
            <Form.Control
              value={product.description}
              onChange={handleChange}
              type="text"
              placeholder="Mô tả"
              className="container-form-input"
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
          <img src={product.image} alt="-Ảnh" className="img-form" />
        </div>
      </div>
    </div>
  );
};

export default Updata;
