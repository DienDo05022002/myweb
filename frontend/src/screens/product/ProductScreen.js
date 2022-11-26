import React from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useReducer, useEffect, useContext } from 'react';
import http from '../../api/axiosApi';
import Rating from '../../components/Rating';
import './index.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import Top from '../../components/Top';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ProductScreen() {
  const [productDetail, setProductDetail] = useState([]);
  const [overviewCategory, setOverviewCategory] = useState([])
  const [refresh, setRefresh] = useState(1)
  const [comment, setComment] = useState('')
  const params = useParams();
  const { slug } = params;
  const nameUser = localStorage.getItem('user');
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get(`/product/slug/${slug}`);
        setProductDetail(res.data);
        // console.log(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, [slug , refresh]);
  const review = productDetail.reviews
  // console.log(review)
  useEffect(() => {
    const selectCategory = async () => {
      console.log(productDetail.category);
      try {
        const res = await http.get(`/Category-sideBar/category/${productDetail.category}`);
        setOverviewCategory(res.data.product);
        // setSelectOverviewCategory(true)
      } catch (err) {
        // setSelectOverviewCategory(false)
      }
    };
    selectCategory()
  }, [productDetail.category])

  // Feature cart
  // 1. buy now
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cart: { cartItem} } = state;
  const buyOrderHandler = async () => {
    const existItem = cart.cartItem.find((x) => x._id === productDetail._id);
    const quantiny = existItem ? existItem.quantiny + 1 : 1;
    const data = await http.get(`product/${productDetail._id}`);
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...productDetail, quantiny },
    });
    navigate('/cart')
  };

  //2. add
  const addOrderHandler = async (i) => {
    const existItem = cartItem.find((x) => x._id === i._id);
    console.log(existItem)
    const quantiny = existItem ? existItem.quantiny + 1 : 1;
    const {data} = await http.get(`product/${i._id}`);
    console.log(data)
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...i, quantiny },
    });
  };

  return (
    <div>
      <Row className="row-detail">
        <Col md={6}>
          <img
            src={productDetail?.image}
            alt={productDetail?.name}
            className="img-large"
          />
          <p>{productDetail?.name}</p>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{productDetail?.name}</h2>
            </ListGroup.Item>
            <div>
              <Card.Title>{productDetail?.name}</Card.Title>
              <Card.Title>{productDetail?.discount}{'.000'}</Card.Title>
              <Card.Text className="title-product">
                <p>Giá: <span className='icon-price'>₫</span>{productDetail?.price}{'.000'}</p>
              </Card.Text>
            </div>
            <div>
              <Rating
                rating={productDetail?.rating}
                numReviews={productDetail?.numReviews}
                className="rating"
              />
            </div>
            <Card.Text>
              <p>Mô tả: {productDetail?.description}</p>
              <p>Tích poin: {productDetail?.countIn} poin</p>
            </Card.Text>
            <ListGroup.Item>
              <div className="d-grid">
                <Button variant="primary" onClick={buyOrderHandler}>Order ngay</Button>
                <Button variant="primary" onClick={()=> addOrderHandler(productDetail)}>Chọn</Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <div>


        {/*----------- Comment/Review-----------http://localhost:3010/v1/product/review/ */}
        <div>
          <div className='comment-container'>
          <FloatingLabel label="Viết bình luận..." className='floating-input'>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '70px' }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className='floating-button' style={{backgroundColor: 'blue'}}
              onClick={ async () => {
                const res = await http.patch(`/product/review/${slug}`, {
                  name: nameUser,
                  comment: comment
                }) 
                setComment('')
                if(res.data.success) {
                  // setComment('')
                  console.log(res.data)
                  setRefresh((f) => f + 1 )
                }
              }}
            >Gửi bình luận</Button>
          </FloatingLabel>
            {review && review?.map((r) => (
              <div key = {r._id} className='comment-showOne'>
                <svg style={{width: '20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <div className='comment-user'>
                  <div style={{ fontSize: 'smaller'}}>{r.createdAt.substring(0, 10)}</div>
                  <strong className='comment-text' style={{marginBottom: '0'}}>{r.name}</strong>
                  <p className='comment-text' style={{marginBottom: '0'}}>{r.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      <div className='overviewCategory-category-interest'>
        <div style={{position: 'relative'}} className='div-top'>
        <h2 className='div-top-h2'>Có thể bạn quan tâm</h2>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15
            },
          }}
        >
          {overviewCategory?.map((product, index) => (
          <SwiperSlide>
                <Top key={index} product={product}/>
          </SwiperSlide>
          ))} 
        </Swiper>
      </div>

      </div>
      </div>
    </div>
  );
}

export default ProductScreen;
