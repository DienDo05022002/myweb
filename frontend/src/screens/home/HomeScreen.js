import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import http from '../../api/axiosApi';
import Product from '../../components/Product';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SlideShow from '../../layout/SlideShow';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Top from '../../components/Top';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [top, setTop] = useState([]);
  const [pagination, setPagination ] = useState(1);
  const [page, setPage ] = useState([]);
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/products');
        setProducts(res.data);
        // console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, []);
  useEffect(() => {
    const results = async () => {
      try {
        const res = await http.get('/homePage/rollTop');
        setTop(res.data);
        // console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, []);
  const increaseHandle = () => {
    setPagination(pagination + 1)
    // results();
  }
  const minusHandle = () => {
    setPagination(pagination - 1)
  }
  useEffect(() => {
    const results = async () => {
      try {
        console.log(pagination)
        const res = await http.get(`/pagination/products?page=${pagination}`);
        setPage(res.data);
        console.log(res.data)
      } catch (err) {
        if (err.res) {
          console.log(err.res.data.message);
        } else {
          console.log('Error: Network Error');
        }
      }
    };
    results();
  }, []);
  // console.log(top)
  // console.log(products)
  console.log(page.products)
  return (
    <div>
      <div>
          <SlideShow/>
      </div>
      <div style={{position: 'relative'}} className='div-top'>
      <h2 className='div-top-h2'>Hot Trend</h2>
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
          {top?.product?.map((product, index) => (
          <SwiperSlide>
              {/* {top?.product?.map((product, index) => ( */}
                <Top key={index} product={product}/>
              {/* ))} */}
          </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h1 className='div-top-h2'>Sản phẩm tại quán</h1>
      <div className="products">
        <Row>
          {page?.products && page?.products.map((product , index) => (
            <Col sm={6} md={4} lg={3} className='mb-3'  key={product.slug}>
            <Product product={product}></Product>
            </Col>
          ))}
        </Row>
        <div>
          <button onClick={minusHandle}>lui</button>
          <button onClick={increaseHandle}>toi</button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
